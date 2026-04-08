import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, Play, Pause, SkipForward, RotateCcw, Volume2, Minus, Plus, List } from 'lucide-react';
import { Recipe } from '../utils/mockData';
import { Button } from './ui/button';

interface VoiceCookingProps {
  recipe: Recipe;
  servings: number;
  onClose: () => void;
  onBack: () => void;
}

export const VoiceCooking: React.FC<VoiceCookingProps> = ({ recipe, servings: initialServings, onClose, onBack }) => {
  const { i18n, t } = useTranslation();
  const [servings, setServings] = useState<number>(initialServings);
  const translatedTitle = t(`recipes.${recipe.id}.title`, { defaultValue: recipe.title });
  const translatedInstructions = t(`recipes.${recipe.id}.instructions`, { returnObjects: true });
  const instructions = Array.isArray(translatedInstructions) ? translatedInstructions : recipe.instructions;

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
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

    // Set language matching current UI language
    // mapping i18n codes to BCP 47 tags if necessary
    const langMap: { [key: string]: string } = {
      'en': 'en-US',
      'hi': 'hi-IN',
      'ta': 'ta-IN',
      'ml': 'ml-IN'
    };

    utterance.lang = langMap[i18n.language] || 'en-US';

    // Try to find a voice for the selected language
    const voices = synthesis.getVoices();
    const voice = voices.find((v: SpeechSynthesisVoice) => v.lang.startsWith(i18n.language));
    if (voice) {
      utterance.voice = voice;
    }

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
      const stepText = `Step ${currentStep + 1}. ${instructions[currentStep]}`;
      speak(stepText);
    }
  };

  const handleNext = () => {
    if (currentStep < instructions.length - 1) {
      synthesis?.cancel();
      setCurrentStep(currentStep + 1);
      setIsPlaying(false);
    }
  };

  const handleRepeat = () => {
    const stepText = `Step ${currentStep + 1}. ${instructions[currentStep]}`;
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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="absolute inset-0 bg-[#FCFBF7]/90 backdrop-blur-xl z-[-1]" onClick={onClose} />
      <div className="min-h-screen p-4 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-2xl py-10"
        >
          {/* Header */}
          <div className="bg-white rounded-[3rem] p-10 mb-8 shadow-2xl border border-black/5">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={onBack}
                className="p-3 bg-muted hover:bg-muted/80 rounded-2xl border border-border transition-all text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex flex-col items-center">
                <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-2 opacity-70">{t('recipe.voice_guide')}</h2>
                <h3 className="text-2xl text-foreground font-black tracking-tighter">{translatedTitle}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-3 bg-muted hover:bg-muted/80 rounded-2xl border border-border transition-all text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-border">
              <div className="flex-1 flex items-center justify-between bg-muted p-1.5 rounded-2xl border border-border shadow-inner">
                <button
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  className="w-12 h-12 flex items-center justify-center bg-white/50 hover:bg-white/80 rounded-2xl transition-all border border-black/5"
                >
                  <Minus className="w-5 h-5 text-muted-foreground" />
                </button>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  {servings} {t('recipe.servings', { count: servings })}
                </span>
                <button
                  onClick={() => setServings(servings + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-card hover:bg-muted rounded-xl transition-all border border-border"
                >
                  <Plus className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowIngredients(!showIngredients)}
                className="rounded-2xl gap-3 h-14 px-6 border-border hover:bg-muted text-muted-foreground font-bold text-xs uppercase tracking-widest"
              >
                <List className="w-5 h-5" />
                {t('recipe.ingredients_title')}
              </Button>
            </div>
          </div>

          {/* Scaled Ingredients Overlay/Section */}
          <AnimatePresence>
            {showIngredients && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-card rounded-3xl p-6 mb-6 shadow-2xl overflow-hidden border border-border"
              >
                <h4 className="text-lg font-black text-foreground mb-4 uppercase tracking-tight">{t('recipe.ingredients_title')} ({servings} {t('recipe.servings', { count: servings })})</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recipe.ingredientsWithQuantities && recipe.ingredientsWithQuantities.length > 0 ? (
                    recipe.ingredientsWithQuantities.map((ing, idx) => {
                      const scaledAmount = (ing.amount / recipe.servings) * servings;
                      const displayAmount = Math.round(scaledAmount * 10) / 10;
                      return (
                        <div key={idx} className="flex justify-between p-4 bg-black/5 backdrop-blur-md rounded-2xl border border-black/5 group hover:bg-black/10 transition-all">
                          <span className="text-muted-foreground font-black text-[10px] tracking-widest uppercase">{t(`ingredients_names.${ing.name}`, { defaultValue: ing.name })}</span>
                          <span className="font-black text-accent text-[10px] uppercase tracking-widest">{displayAmount} {ing.unit}</span>
                        </div>
                      );
                    })
                  ) : (
                    recipe.ingredients.map((ing, idx) => (
                      <div key={idx} className="p-3 bg-muted rounded-xl border border-border">
                        <span className="text-muted-foreground font-bold text-sm tracking-tight">{t(`ingredients_names.${ing}`, { defaultValue: ing })}</span>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Current Step Display */}
          <div className="bg-white rounded-[4rem] p-12 mb-8 shadow-2xl border border-black/5 relative overflow-hidden group">
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/5 blur-[120px] rounded-full" />
            
            <div className="text-center mb-10 relative z-10">
              <div className="inline-block bg-primary/10 p-6 rounded-[2rem] mb-6 border border-primary/20 shadow-xl group-hover:scale-110 transition-transform duration-700">
                <Volume2 className="w-16 h-16 text-primary" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4 opacity-70">
                Step {currentStep + 1} of {instructions.length}
              </p>
              <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden border border-border">
                <motion.div
                  className="bg-primary h-full shadow-[0_0_15px_rgba(255,107,107,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / instructions.length) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>

            <p className="text-3xl font-black text-center text-foreground leading-tight tracking-tighter mb-12 min-h-[120px] flex items-center justify-center px-4">
              {instructions[currentStep]}
            </p>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 relative z-10">
              <Button
                onClick={handleRepeat}
                variant="outline"
                className="rounded-full w-16 h-16 p-0 border-border bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all shadow-xl"
              >
                <RotateCcw className="w-6 h-6" />
              </Button>

              <Button
                onClick={handlePlayPause}
                className={`rounded-[2rem] w-24 h-24 p-0 shadow-2xl transition-all duration-500 border-4 border-black/20 ${
                  isPlaying
                  ? 'bg-destructive scale-90 shadow-destructive/20'
                  : 'bg-primary scale-100 shadow-primary/20 hover:scale-105'
                  }`}
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10 text-white fill-white" />
                ) : (
                  <Play className="w-10 h-10 text-white fill-white translate-x-1" />
                )}
              </Button>

              <Button
                onClick={handleNext}
                variant="outline"
                className="rounded-full w-16 h-16 p-0 border-border bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all shadow-xl disabled:opacity-20"
                disabled={currentStep === instructions.length - 1}
              >
                <SkipForward className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* All Steps */}
          <div className="bg-white rounded-[3rem] p-8 shadow-2l border border-black/5">
            <h4 className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em] mb-6 opacity-60 px-2">All Steps</h4>
            <div className="space-y-3">
              {instructions.map((instruction, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`w-full text-left flex gap-5 p-5 rounded-[1.5rem] transition-all border group ${
                    index === currentStep
                    ? 'bg-primary/20 border-primary/40 shadow-[0_0_20px_rgba(255,107,107,0.1)] scale-[1.02]'
                    : index < currentStep
                      ? 'bg-accent/10 border-accent/20 opacity-60'
                      : 'bg-black/5 border-black/5 hover:bg-black/10'
                    }`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center font-black transition-all ${
                      index === currentStep
                      ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/20'
                      : index < currentStep
                        ? 'bg-accent text-black'
                        : 'bg-muted text-muted-foreground group-hover:bg-muted/80'
                      }`}
                  >
                    {index + 1}
                  </div>
                  <p className={`text-sm font-medium leading-relaxed pt-2 transition-colors ${
                    index === currentStep ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>{instruction}</p>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
