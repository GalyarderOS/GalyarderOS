import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/auth/useAuth';
import { Button } from '@/components/global/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/global/ui/dialog';
import { Input } from '@/components/global/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/global/ui/avatar';
import { User, Camera } from 'lucide-react';
import { toast } from 'sonner';

const profileSchema = z.object({
  full_name: z.string().min(1, "Name is required.").max(100, "Name is too long"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const validateAvatarFile = (file: File): string | null => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 2 * 1024 * 1024; // 2MB
  
  if (!allowedTypes.includes(file.type)) {
    return "Only JPEG, PNG, and WebP images are allowed.";
  }
  
  if (file.size > maxSize) {
    return "File size must be less than 2MB.";
  }
  
  return null;
};

export const AccountSettingsDialog: React.FC<{ onOpenChange: (open: boolean) => void }> = ({ onOpenChange }) => {
  const { user, profile, reloadProfile, updateProfile, uploadAvatar } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema)
  });

  useEffect(() => {
    if (profile) {
      reset({ full_name: profile.full_name || '' });
    }
  }, [profile, reset]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validationError = validateAvatarFile(file);
      
      if (validationError) {
        toast.error(validationError);
        e.target.value = ''; // Clear the input
        return;
      }
      
      setAvatarFile(file);
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;

    try {
      setIsUploading(true);
      let avatarUrl = profile?.avatar_url;

      if (avatarFile) {
        const { data: uploadData, error: uploadError } = await uploadAvatar(user.id, avatarFile);
        if (uploadError) throw uploadError;
        avatarUrl = uploadData.publicUrl;
      }

      const { error: updateError } = await updateProfile(user.id, { ...data, avatar_url: avatarUrl });
      if (updateError) throw updateError;

      toast.success('Profile updated successfully!');
      await reloadProfile();
      setAvatarFile(null);
      onOpenChange(false);
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile.');
    } finally {
      setIsUploading(false);
    }
  };

  const avatarPreview = avatarFile 
    ? URL.createObjectURL(avatarFile) 
    : (profile?.avatar_url || user?.user_metadata?.avatar_url);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Account Settings</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col items-center space-y-4 pt-4">
          <div className="relative">
            <Avatar className="w-24 h-24 text-lg">
              <AvatarImage src={avatarPreview} alt="User Avatar" />
              <AvatarFallback>
                <User className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>
            <label 
              htmlFor="avatar-upload" 
              className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
            >
              <Camera className="w-4 h-4" />
              <input 
                id="avatar-upload" 
                type="file" 
                className="hidden" 
                accept="image/jpeg,image/png,image/webp" 
                onChange={handleAvatarChange} 
                disabled={isUploading} 
              />
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="full_name" className="text-sm font-medium">Full Name</label>
          <Input 
            id="full_name" 
            {...register('full_name')} 
            className="mt-1"
            disabled={isSubmitting || isUploading}
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" disabled={isSubmitting || isUploading}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting || isUploading}>
            {isSubmitting || isUploading ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
