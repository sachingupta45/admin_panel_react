export type UserRole = 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';
export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type ActivityLevel = 'Low' | 'Moderate' | 'High' | 'Athlete';
export type TrainingGoal = 'Fat Loss' | 'Muscle Gain' | 'Maintain' | 'Performance';
export type DietType = 'Veg' | 'Non-Veg' | 'Vegan' | 'Keto' | 'Paleo';
export type UserStatus = 'active' | 'inactive' | 'blocked';
export type Gender = 'Male' | 'Female' | 'Other';

export interface User {
    id: number;
    username: string;
    email: string;
    password?: string;
    height_cm: number;
    weight_kg: number;
    role: UserRole;
    dob: string;
    experience_level: ExperienceLevel;
    activity_level: ActivityLevel;
    training_goal: TrainingGoal;
    diet_type: DietType;
    gender: Gender;
    status: UserStatus;
    food_allergies?: string;
    food_preferences?: string;
    meals_per_day?: number;
    sleep_hours?: number;
    practice_type?: { pt: string; time: number }[];
    cricket_match_over?: number;
    injuries?: string;
    profile_photo?: string;
    created_at: string;
    modified_at: string;
}

export interface MealAnalysis {
    id: number;
    user_id: number;
    username?: string; // Joined for display
    quantity: number;
    quantity_unit?: string;
    meal_time: string;
    image_path?: string;
    ai_response: string;
    item_name?: string;
    calories: number;
    protein_g: number;
    carbs_g: number;
    fats_g: number;
    fiber_g: number;
    sugar_g: number;
    sodium_mg: number;
    created_at: string;
    meal_date: string;
}

export interface RequiredDietLog {
    id: number;
    user_id: number;
    username?: string; // Joined for display
    diet_date: string;
    calories: number;
    protein_g: number;
    carbs_g: number;
    fats_g: number;
    fiber_g: number;
    sugar_g: number;
    sodium_mg: number;
    created_at: string;
    meal_per_day: number;
}

export interface WaterIntakeLog {
    id: number;
    user_id: number;
    username?: string; // Joined for display
    water_ml: number;
    logged_at: string;
    image_path?: string;
    water_time?: string;
    bottle_type?: string;
}
