import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { 
  LogOut, Settings, Bell, Moon, Sun, 
  HelpCircle, ChevronRight, Share2, Star, Info, Shield, 
  Smartphone, Beaker, Edit3, Bug, MessageSquare, UtensilsCrossed, Globe, Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LanguageSelector } from './LanguageSelector';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { toast } from 'sonner';

export const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout, updateUserSettings } = useApp();

  const [editName, setEditName] = useState(user?.name || '');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSaveProfile = () => {
    updateUserSettings({ name: editName });
    setIsEditModalOpen(false);
    toast.success(t('profile.update_success', 'Profile updated successfully'));
  };

  const SectionTitle = ({ title, icon: Icon }: { title: string, icon: any }) => (
    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 px-1 flex items-center gap-2">
      <Icon className="w-4 h-4" /> {title}
    </h4>
  );

  return (
    <div className="max-w-md mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32" style={{ perspective: "1200px" }}>
      {/* 1. USER PROFILE MANAGEMENT */}
      <motion.div 
        whileHover={{ rotateX: 2, rotateY: -2, z: 10 }}
        className="bg-white/80 backdrop-blur-2xl rounded-[3rem] p-8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.1)] border border-black/5 mt-4 relative overflow-hidden group"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50"></div>
        <div className="flex justify-between items-start relative z-10">
          <div className="flex gap-5">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-foreground/20 rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-2xl border-2 border-border relative group">
              {user?.name?.[0]?.toUpperCase() || 'U'}
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="pt-3">
              <h3 className="text-3xl font-black text-foreground tracking-tight">{user?.name}</h3>
              <p className="text-muted-foreground text-xs font-bold flex items-center gap-2 mt-2 uppercase tracking-widest opacity-60">
                <Shield className="w-4 h-4 text-accent" /> {user?.role ? t(`profile.role.${user.role}`, user.role) : t('profile.community_member', 'Community Member')}
              </p>
            </div>
          </div>
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary rounded-full">
                <Edit3 className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl">
              <DialogHeader>
                <DialogTitle>{t('profile.edit_profile', 'Edit Profile')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t('profile.display_name', 'Display Name')}</label>
                  <Input 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)} 
                    className="rounded-xl border-gray-200"
                  />
                </div>
                <Button onClick={handleSaveProfile} className="w-full bg-primary hover:bg-primary/90 rounded-xl text-white">
                  {t('profile.save_changes', 'Save Changes')}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>



      {/* 3 & 4. SETTINGS SECTION */}
      <div className="space-y-6">
        {/* Account Settings */}
        <div className="space-y-4">
          <SectionTitle title={t('profile.account_preferences', 'Account & Preferences')} icon={Settings} />
          <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-black/5 overflow-hidden shadow-xl">
            
            {/* Diet Preference */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl text-primary border border-primary/20"><UtensilsCrossed className="w-4 h-4" /></div>
                <div>
                  <p className="font-bold text-foreground">{t('profile.diet_preference', 'Diet Preference')}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60 tracking-wider">{t('profile.diet_desc', 'Affects recommendations')}</p>
                </div>
              </div>
              <div className="flex bg-muted/50 rounded-xl p-1 border border-border">
                <button 
                  className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${user?.preference === 'veg' ? 'bg-primary shadow-lg text-white scale-105' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => updateUserSettings({ preference: 'veg' })}
                >{t('profile.veg', 'Veg')}</button>
                <button 
                  className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${user?.preference === 'non-veg' ? 'bg-primary shadow-lg text-white scale-105' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => updateUserSettings({ preference: 'non-veg' })}
                >{t('profile.non_veg', 'Non-Veg')}</button>
              </div>
            </div>

            {/* Language */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-xl text-accent border border-accent/20"><Globe className="w-4 h-4" /></div>
                <p className="font-bold text-foreground">{t('profile.app_language', 'App Language')}</p>
              </div>
              <div className="scale-90 origin-right shadow-xl rounded-xl overflow-hidden">
                <LanguageSelector />
              </div>
            </div>

            {/* Measurement Units */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl text-primary border border-primary/20"><Beaker className="w-4 h-4" /></div>
                <p className="font-bold text-foreground">{t('profile.measurement_system', 'Measurement System')}</p>
              </div>
              <div className="flex bg-muted/50 rounded-xl p-1 border border-border">
                <button 
                  className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${user?.measurementUnit !== 'imperial' ? 'bg-primary shadow-lg text-white scale-105' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => updateUserSettings({ measurementUnit: 'metric' })}
                >{t('profile.metric', 'Grams/ML')}</button>
                <button 
                  className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${user?.measurementUnit === 'imperial' ? 'bg-primary shadow-lg text-white scale-105' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => updateUserSettings({ measurementUnit: 'imperial' })}
                >{t('profile.imperial', 'Cups')}</button>
              </div>
            </div>

          </div>
        </div>

        {/* 6, 7 & 11. DEVICE & DISPLAY */}
        <div className="space-y-4">
          <SectionTitle title={t('profile.device_display', 'Device & Display')} icon={Smartphone} />
          <div className="bg-card rounded-3xl border border-border/50 overflow-hidden shadow-2xl">
            
            {/* Notifications */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-destructive/10 rounded-xl text-destructive border border-destructive/20"><Bell className="w-4 h-4" /></div>
                <div>
                  <p className="font-bold text-foreground">{t('profile.notifications', 'Push Notifications')}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60 tracking-wider">{t('profile.notifications_desc', 'Meal reminders')}</p>
                </div>
              </div>
              <Switch 
                checked={user?.notifications ?? true}
                onCheckedChange={(checked) => updateUserSettings({ notifications: checked })}
              />
            </div>

            {/* Theme */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-xl text-muted-foreground border border-border">
                  {user?.theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </div>
                <p className="font-bold text-foreground">{t('profile.dark_mode', 'Dark Mode')}</p>
              </div>
              <Switch 
                checked={user?.theme === 'dark'}
                onCheckedChange={(checked) => updateUserSettings({ theme: checked ? 'dark' : 'light' })}
              />
            </div>

            {/* Home Connect */}
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-accent/10 rounded-xl text-accent border border-accent/20"><Smartphone className="w-4 h-4" /></div>
                <div>
                  <p className="font-bold text-foreground">{t('profile.smart_appliances', 'Smart Appliances')}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60 tracking-wider">{t('profile.home_connect_desc', 'Home Connect integration')}</p>
                </div>
              </div>
              <Switch 
                checked={user?.homeConnect ?? false}
                onCheckedChange={(checked) => updateUserSettings({ homeConnect: checked })}
              />
            </div>

          </div>
        </div>





        {/* 9. RECOMMENDATIONS */}
        <div className="space-y-4">
          <SectionTitle title={t('profile.community', 'Community')} icon={Heart} />
          <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-2xl grid grid-cols-2">
            <button className="flex flex-col items-center justify-center p-8 border-r border-border hover:bg-muted transition-all group" onClick={() => toast.success(t('profile.share_toast', 'App link copied to clipboard!'))}>
              <div className="p-4 bg-primary/10 rounded-full text-primary mb-4 border border-primary/20 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all"><Share2 className="w-5 h-5" /></div>
              <span className="font-black text-foreground text-[10px] uppercase tracking-widest">{t('profile.tell_friend', 'Tell a Friend')}</span>
            </button>
            <button className="flex flex-col items-center justify-center p-8 hover:bg-muted transition-all group" onClick={() => toast.success(t('profile.rate_toast', 'Redirecting to Store...'))}>
              <div className="p-4 bg-accent/10 rounded-full text-accent mb-4 border border-accent/20 group-hover:scale-110 group-hover:bg-accent group-hover:text-black transition-all"><Star className="w-5 h-5" /></div>
              <span className="font-black text-foreground text-[10px] uppercase tracking-widest">{t('profile.rate_app', 'Rate App')}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Logout */}
      <div className="pt-6">
        <Button
          variant="outline"
          className="w-full py-7 text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/20 rounded-2xl flex items-center justify-center gap-3 text-lg font-black uppercase tracking-widest transition-all shadow-xl shadow-red-500/5 group"
          onClick={logout}
        >
          <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          {t('header.logout', 'Log Out')}
        </Button>
        <div className="text-center mt-10">
          <p className="text-[10px] text-muted-foreground font-black tracking-[0.2em] opacity-40 uppercase">AI RECIPE RECOMMENDER V2.2.0</p>
          <p className="text-[9px] text-muted-foreground font-bold flex items-center justify-center gap-1.5 mt-2 opacity-30 uppercase tracking-widest">
             <Shield className="w-3 h-3 text-accent" /> {t('profile.secure_sync', 'Secure Cloud Sync Active')}
          </p>
        </div>
      </div>
    </div>
  );
};
