import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/global/ui/card';
import { Button } from '@/components/global/ui/button';
import { Input } from '@/components/global/ui/input';
import { Label } from '@/components/global/ui/label';
import { Textarea } from '@/components/global/ui/textarea';
import { Badge } from '@/components/global/ui/badge';
import { User, Edit, Save, Plus, X } from 'lucide-react';
import { useAuth } from '@/contexts/auth/useAuth';
// import { supabase } from '@/integrations/supabase/client';
// import { TablesUpdate } from '@/integrations/supabase/types';

const ProfileModule = () => {
  const { user, profile, reloadProfile, loadingProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    professionalTitle: '',
    bio: '',
    coreValues: [], // Removed mock values
    mission: '',
    vision: ''
  });

  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        fullName: profile.full_name || '',
        professionalTitle: profile.professional_title || '',
        bio: profile.life_purpose || '',
        mission: profile.mission_statement || '',
        vision: profile.vision_statement || '',
        coreValues: [], // Ensure core values are empty on load, or fetched from profile if available
      }));
    }
  }, [profile]);


  const handleSave = async () => {
    console.warn('Profile save: Not implemented.', formData);
      setIsEditing(false);
    // You might want to show a toast notification here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({...prev, [id]: value}));
  };

  const addCoreValue = () => {
    if (newValue.trim()) {
      setFormData(prev => ({
        ...prev,
        coreValues: [...prev.coreValues, newValue.trim()]
      }));
      setNewValue('');
    }
  };

  const removeCoreValue = (index: number) => {
    setFormData(prev => ({
      ...prev,
      coreValues: prev.coreValues.filter((_, i) => i !== index)
    }));
  };

  if (loadingProfile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'Playfair Display' }}>
            Profile & Ethos
          </h1>
          <p className="text-gray-600">Define who you are and what drives you</p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#1a1a1a]"
        >
          {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-[#FFD700]" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-lg font-medium">{formData.fullName}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="professionalTitle">Professional Title</Label>
                {isEditing ? (
                  <Input
                    id="professionalTitle"
                    value={formData.professionalTitle}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-700">{formData.professionalTitle}</p>
                )}
              </div>

              <div>
                <Label htmlFor="bio">Life Purpose / Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="mt-1"
                    rows={3}
                  />
                ) : (
                  <p className="mt-1 text-gray-700">{formData.bio}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Core Values</CardTitle>
              <CardDescription>
                The principles that guide your decisions (not saved to database)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {formData.coreValues.map((value, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {value}
                      {isEditing && (
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => removeCoreValue(index)}
                        />
                      )}
                    </Badge>
                  ))}
                </div>
                
                {isEditing && (
                  <div className="flex space-x-2">
                    <Input
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      placeholder="Add a core value"
                      onKeyPress={(e) => e.key === 'Enter' && addCoreValue()}
                    />
                    <Button size="sm" onClick={addCoreValue}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Mission Statement</CardTitle>
              <CardDescription>
                Your purpose and what you aim to achieve
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  id="mission"
                  value={formData.mission}
                  onChange={handleInputChange}
                  rows={4}
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{formData.mission}</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Vision Statement</CardTitle>
              <CardDescription>
                The future you want to create
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  id="vision"
                  value={formData.vision}
                  onChange={handleInputChange}
                  rows={4}
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{formData.vision}</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileModule;
