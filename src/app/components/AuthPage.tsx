import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChefHat, Mail, Lock, User, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useApp } from '../context/AppContext';

export const AuthPage: React.FC = () => {
  const { login, signup } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    preference: 'veg' as 'veg' | 'non-veg',
    language: 'English'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await login(formData.email, formData.password);
    } else {
      await signup(
        formData.name,
        formData.email,
        formData.password,
        formData.preference,
        formData.language
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-br from-green-100 to-red-100 p-4 rounded-2xl mb-4">
            <ChefHat className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl mb-2 text-gray-800">Smart Recipe AI</h1>
          <p className="text-gray-600">Your personalized diet companion</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4" />
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="rounded-xl"
              />
            </div>
          )}

          <div>
            <Label htmlFor="email" className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="rounded-xl"
            />
          </div>

          <div>
            <Label htmlFor="password" className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="rounded-xl"
            />
          </div>

          {!isLogin && (
            <>
              <div>
                <Label className="mb-3 block">Diet Preference</Label>
                <RadioGroup
                  value={formData.preference}
                  onValueChange={(value) => setFormData({ ...formData, preference: value as 'veg' | 'non-veg' })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem value="veg" id="veg" />
                    <Label htmlFor="veg" className="cursor-pointer flex-1 text-center py-3 px-4 rounded-xl border-2 border-green-200 bg-green-50">
                      🟢 Vegetarian
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem value="non-veg" id="non-veg" />
                    <Label htmlFor="non-veg" className="cursor-pointer flex-1 text-center py-3 px-4 rounded-xl border-2 border-red-200 bg-red-50">
                      🔴 Non-Veg
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="language" className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4" />
                  Language
                </Label>
                <Input
                  id="language"
                  type="text"
                  placeholder="English"
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            </>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl h-12 text-lg"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 hover:text-green-700"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
