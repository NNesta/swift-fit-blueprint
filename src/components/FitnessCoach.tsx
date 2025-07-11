import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Clock, Target, CheckCircle, Star, Heart, Zap } from "lucide-react";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  muscleGroups: string[];
}

interface ExerciseCategory {
  title: string;
  description: string;
  icon: any;
  exercises: Exercise[];
}

const FitnessCoach = () => {
  const exerciseCategories: ExerciseCategory[] = [
    {
      title: "Upper Body",
      description: "Build strength in your arms, chest, and back",
      icon: Dumbbell,
      exercises: [
        {
          name: "Push-ups",
          sets: "3",
          reps: "8-12",
          description: "Classic chest and arm builder. Start on knees if needed.",
          difficulty: "Beginner",
          muscleGroups: ["Chest", "Arms", "Core"]
        },
        {
          name: "Dumbbell Rows",
          sets: "3",
          reps: "10-12",
          description: "Bent over row, pull dumbbells to chest, squeeze shoulder blades",
          difficulty: "Intermediate",
          muscleGroups: ["Back", "Arms"]
        },
        {
          name: "Overhead Press",
          sets: "3",
          reps: "8-10",
          description: "Press dumbbells or barbell overhead, engage your core",
          difficulty: "Intermediate",
          muscleGroups: ["Shoulders", "Arms", "Core"]
        },
        {
          name: "Pull-ups",
          sets: "3",
          reps: "5-8",
          description: "Hang from bar and pull yourself up. Use assistance if needed.",
          difficulty: "Advanced",
          muscleGroups: ["Back", "Arms"]
        }
      ]
    },
    {
      title: "Lower Body",
      description: "Strengthen your legs and glutes",
      icon: Target,
      exercises: [
        {
          name: "Bodyweight Squats",
          sets: "3",
          reps: "12-15",
          description: "Squat down keeping knees behind toes, chest up",
          difficulty: "Beginner",
          muscleGroups: ["Legs", "Glutes"]
        },
        {
          name: "Lunges",
          sets: "3",
          reps: "10 each leg",
          description: "Step forward into lunge, alternate legs",
          difficulty: "Beginner",
          muscleGroups: ["Legs", "Glutes", "Core"]
        },
        {
          name: "Goblet Squats",
          sets: "3",
          reps: "12-15",
          description: "Hold dumbbell at chest, squat down keeping back straight",
          difficulty: "Intermediate",
          muscleGroups: ["Legs", "Glutes", "Core"]
        },
        {
          name: "Single-leg Deadlifts",
          sets: "3",
          reps: "8 each leg",
          description: "Balance on one leg, hinge at hip, touch floor",
          difficulty: "Advanced",
          muscleGroups: ["Legs", "Glutes", "Core"]
        }
      ]
    },
    {
      title: "Core & Cardio",
      description: "Build core strength and cardiovascular fitness",
      icon: Heart,
      exercises: [
        {
          name: "Plank",
          sets: "3",
          reps: "30-60 seconds",
          description: "Hold plank position on forearms, keep body straight",
          difficulty: "Beginner",
          muscleGroups: ["Core", "Shoulders"]
        },
        {
          name: "Mountain Climbers",
          sets: "3",
          reps: "30 seconds",
          description: "Plank position, alternate bringing knees to chest rapidly",
          difficulty: "Intermediate",
          muscleGroups: ["Core", "Cardio"]
        },
        {
          name: "Burpees",
          sets: "3",
          reps: "8-10",
          description: "Squat, jump back to plank, push-up, jump forward, jump up",
          difficulty: "Advanced",
          muscleGroups: ["Full Body", "Cardio"]
        },
        {
          name: "Russian Twists",
          sets: "3",
          reps: "20",
          description: "Sit with feet up, twist torso side to side",
          difficulty: "Intermediate",
          muscleGroups: ["Core"]
        }
      ]
    }
  ];

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
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-full shadow-glow">
              <Dumbbell className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Physical Exercise Library
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive collection of physical exercises organized by muscle groups and difficulty levels.
          </p>
        </div>

        {/* Exercise Categories */}
        <div className="grid gap-8">
          {exerciseCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="bg-gradient-card shadow-primary animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  {category.title}
                </CardTitle>
                <CardDescription className="text-lg">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {category.exercises.map((exercise, exerciseIndex) => (
                    <Card key={exerciseIndex} className="bg-card shadow-lg hover:shadow-primary transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-lg font-semibold">{exercise.name}</h4>
                          <Badge className={getDifficultyColor(exercise.difficulty)}>
                            <Star className="h-3 w-3 mr-1" />
                            {exercise.difficulty}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{exercise.description}</p>
                        
                        <div className="flex gap-4 text-sm mb-3">
                          <div className="flex items-center gap-1">
                            <span className="font-medium">Sets:</span>
                            <span className="text-primary font-semibold">{exercise.sets}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">Reps:</span>
                            <span className="text-primary font-semibold">{exercise.reps}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {exercise.muscleGroups.map((muscle, muscleIndex) => (
                            <Badge key={muscleIndex} variant="outline" className="text-xs">
                              {muscle}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* General Tips */}
        <Card className="bg-accent/10 border-accent/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              General Exercise Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm">Always warm up before exercising</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm">Focus on proper form over heavy weight</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm">Rest 48-72 hours between training same muscle groups</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm">Stay hydrated throughout your workout</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm">Progress gradually to avoid injury</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm">Listen to your body and rest when needed</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FitnessCoach;