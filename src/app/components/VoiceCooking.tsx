import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, ArrowLeft, Play, Pause, SkipForward, RotateCcw, Volume2 } from 'lucide-react';
import { Recipe } from '../utils/mockData';
import { Button } from './ui/button';

interface VoiceCookingProps {
  recipe: Recipe;
  onClose: () => void;
  onBack: () => void;
}

export const VoiceCooking: React.FC<VoiceCookingProps> = ({ recipe, onClose, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSynthesis(window.speechSynthesis);
    }
  }, []);

  const speak = (text: string) => {
    if (!synthesis) return;

    // Cancel any ongoing speech
    synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      setIsPlaying(false);
    };

    synthesis.speak(utterance);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (!synthesis) return;

    if (isPlaying) {
      synthesis.cancel();
      setIsPlaying(false);
    } else {
      const stepText = `Step ${currentStep + 1}. ${recipe.instructions[currentStep]}`;
      speak(stepText);
    }
  };

  const handleNext = () => {
    if (currentStep < recipe.instructions.length - 1) {
      synthesis?.cancel();
      setCurrentStep(currentStep + 1);
      setIsPlaying(false);
    }
  };

  const handleRepeat = () => {
    const stepText = `Step ${currentStep + 1}. ${recipe.instructions[currentStep]}`;
    speak(stepText);
  };

  const handleStepClick = (index: number) => {
    synthesis?.cancel();
    setCurrentStep(index);
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      synthesis?.cancel();
    };
  }, [synthesis]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-purple-50 z-50 overflow-y-auto">
      <div className="min-h-screen p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="bg-white rounded-3xl p-6 mb-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 className="text-xl text-gray-800">Voice-Guided Cooking</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <h3 className="text-2xl text-gray-800 text-center">{recipe.title}</h3>
          </div>

          {/* Current Step Display */}
          <div className="bg-white rounded-3xl p-8 mb-6 shadow-lg">
            <div className="text-center mb-6">
              <div className="inline-block bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-full mb-4">
                <Volume2 className="w-12 h-12 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Step {currentStep + 1} of {recipe.instructions.length}
              </p>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / recipe.instructions.length) * 100}%` }}
                />
              </div>
            </div>

            <p className="text-2xl text-center text-gray-800 leading-relaxed mb-8">
              {recipe.instructions[currentStep]}
            </p>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={handleRepeat}
                variant="outline"
                size="lg"
                className="rounded-full w-14 h-14 p-0"
              >
                <RotateCcw className="w-6 h-6" />
              </Button>

              <Button
                onClick={handlePlayPause}
                size="lg"
                className={`rounded-full w-20 h-20 p-0 ${
                  isPlaying
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8" />
                )}
              </Button>

              <Button
                onClick={handleNext}
                variant="outline"
                size="lg"
                className="rounded-full w-14 h-14 p-0"
                disabled={currentStep === recipe.instructions.length - 1}
              >
                <SkipForward className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* All Steps */}
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h4 className="text-lg mb-4 text-gray-800">All Steps</h4>
            <div className="space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`w-full text-left flex gap-4 p-4 rounded-2xl transition-all ${
                    index === currentStep
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200'
                      : index < currentStep
                      ? 'bg-green-50 border-2 border-green-200'
                      : 'bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      index === currentStep
                        ? 'bg-blue-500 text-white'
                        : index < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <p className="text-gray-700 pt-1">{instruction}</p>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
