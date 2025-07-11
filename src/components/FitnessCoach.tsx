import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Clock, Target, Zap, CheckCircle, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WorkoutExercise {
  name: string;
  sets: string;
  reps: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface WorkoutPlan {
  title: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  equipment: string[];
  exercises: WorkoutExercise[];
  tips: string[];
}

const FitnessCoach = () => {
  const [userInput, setUserInput] = useState("");
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Mock workout plans for demonstration
  const mockWorkouts: Record<string, WorkoutPlan> = {
    strength: {
      title: "Strength Building Routine",
      duration: "20 minutes",
      difficulty: "Intermediate",
      equipment: ["Dumbbells"],
      exercises: [
        {
          name: "Dumbbell Squats",
          sets: "3",
          reps: "12-15",
          description: "Hold dumbbells at your sides, squat down keeping your back straight",
          difficulty: "Beginner"
        },
        {
          name: "Dumbbell Rows",
          sets: "3",
          reps: "10-12",
          description: "Bent over row, pull dumbbells to your chest, squeeze shoulder blades",
          difficulty: "Intermediate"
        },
        {
          name: "Dumbbell Press",
          sets: "3",
          reps: "8-12",
          description: "Press dumbbells overhead, keep core engaged",
          difficulty: "Intermediate"
        },
        {
          name: "Lunges",
          sets: "2",
          reps: "10 each leg",
          description: "Step forward into lunge position, alternate legs",
          difficulty: "Beginner"
        }
      ],
      tips: [
        "Rest 60-90 seconds between sets",
        "Focus on proper form over heavy weight",
        "Warm up for 5 minutes before starting"
      ]
    },
    cardio: {
      title: "High-Intensity Cardio Blast",
      duration: "15 minutes",
      difficulty: "Advanced",
      equipment: ["No equipment"],
      exercises: [
        {
          name: "Burpees",
          sets: "3",
          reps: "30 seconds",
          description: "Full body movement: squat, jump back, push-up, jump forward, jump up",
          difficulty: "Advanced"
        },
        {
          name: "Mountain Climbers",
          sets: "3",
          reps: "45 seconds",
          description: "Plank position, alternate bringing knees to chest rapidly",
          difficulty: "Intermediate"
        },
        {
          name: "Jump Squats",
          sets: "3",
          reps: "20",
          description: "Squat down then explode up into a jump",
          difficulty: "Intermediate"
        }
      ],
      tips: [
        "Keep intensity high throughout",
        "Rest 30 seconds between exercises",
        "Stay hydrated during workout"
      ]
    },
    beginner: {
      title: "Beginner Full Body Workout",
      duration: "25 minutes",
      difficulty: "Beginner",
      equipment: ["Dumbbells", "Mat"],
      exercises: [
        {
          name: "Wall Push-ups",
          sets: "2",
          reps: "8-12",
          description: "Stand arm's length from wall, push against wall and back",
          difficulty: "Beginner"
        },
        {
          name: "Bodyweight Squats",
          sets: "2",
          reps: "10-15",
          description: "Squat down keeping knees behind toes, return to standing",
          difficulty: "Beginner"
        },
        {
          name: "Dumbbell Curls",
          sets: "2",
          reps: "12",
          description: "Stand with dumbbells, curl up to shoulders and back down",
          difficulty: "Beginner"
        },
        {
          name: "Plank Hold",
          sets: "2",
          reps: "20-30 seconds",
          description: "Hold plank position on forearms, keep body straight",
          difficulty: "Beginner"
        }
      ],
      tips: [
        "Start slowly and focus on form",
        "Take longer rests if needed",
        "Progress gradually week by week"
      ]
    }
  };

  const generateWorkoutPlan = async () => {
    if (!userInput.trim()) {
      toast({
        title: "Input Required",
        description: "Please describe your fitness goals first!",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simple logic to determine workout type based on input
    const input = userInput.toLowerCase();
    let selectedWorkout: WorkoutPlan;

    if (input.includes('strength') || input.includes('strong') || input.includes('muscle')) {
      selectedWorkout = mockWorkouts.strength;
    } else if (input.includes('cardio') || input.includes('endurance') || input.includes('running')) {
      selectedWorkout = mockWorkouts.cardio;
    } else if (input.includes('beginner') || input.includes('start') || input.includes('new')) {
      selectedWorkout = mockWorkouts.beginner;
    } else {
      // Default to strength training
      selectedWorkout = mockWorkouts.strength;
    }

    setWorkoutPlan(selectedWorkout);
    setIsGenerating(false);

    toast({
      title: "Workout Generated!",
      description: "Your personalized workout plan is ready.",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-accent text-accent-foreground';
      case 'Intermediate': return 'bg-primary text-primary-foreground';
      case 'Advanced': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-full shadow-glow">
              <Dumbbell className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Personal Fitness Coach
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get a personalized workout plan tailored to your goals, available time, and equipment. 
            Just describe what you want to achieve!
          </p>
        </div>

        {/* Input Section */}
        <Card className="bg-gradient-card shadow-primary animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Tell me about your fitness goals
            </CardTitle>
            <CardDescription>
              Describe your goals, available time, and equipment (e.g., "I want to get stronger, I have 20 minutes a day, and a pair of dumbbells")
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="I want to get stronger, I have 20 minutes a day, and a pair of dumbbells..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            <Button 
              onClick={generateWorkoutPlan}
              disabled={isGenerating}
              variant="hero"
              size="xl"
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Generating your perfect workout...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  Generate Workout Plan
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Workout Plan Display */}
        {workoutPlan && (
          <div className="space-y-6 animate-fade-in">
            {/* Plan Overview */}
            <Card className="bg-gradient-card shadow-primary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{workoutPlan.title}</CardTitle>
                    <CardDescription>Your personalized workout plan</CardDescription>
                  </div>
                  <Badge className={getDifficultyColor(workoutPlan.difficulty)}>
                    <Star className="h-3 w-3 mr-1" />
                    {workoutPlan.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">Duration:</span>
                    <span>{workoutPlan.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dumbbell className="h-4 w-4 text-primary" />
                    <span className="font-medium">Equipment:</span>
                    <span>{workoutPlan.equipment.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="font-medium">Exercises:</span>
                    <span>{workoutPlan.exercises.length} exercises</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Exercises */}
            <div className="grid gap-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                Exercises
              </h3>
              {workoutPlan.exercises.map((exercise, index) => (
                <Card key={index} className="bg-card shadow-lg hover:shadow-primary transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold">{exercise.name}</h4>
                      <Badge variant="outline" className={getDifficultyColor(exercise.difficulty)}>
                        {exercise.difficulty}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{exercise.description}</p>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Sets:</span>
                        <span className="text-primary font-semibold">{exercise.sets}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Reps:</span>
                        <span className="text-primary font-semibold">{exercise.reps}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tips */}
            <Card className="bg-accent/10 border-accent/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {workoutPlan.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button variant="workout" size="lg">
                <CheckCircle className="h-4 w-4" />
                Start Workout
              </Button>
              <Button variant="outline" size="lg" onClick={() => setWorkoutPlan(null)}>
                Generate New Plan
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FitnessCoach;