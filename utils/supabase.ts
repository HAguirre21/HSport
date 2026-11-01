import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import {
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
    VITE_SUPABASE_URL,
    VITE_SUPABASE_PUBLISHABLE_KEY,
} from '@env';

const supabaseUrl =
    SUPABASE_URL ||
    VITE_SUPABASE_URL ||
    'https://nsmgxnmomhylielmbknt.supabase.co';

const supabaseKey =
    SUPABASE_PUBLISHABLE_KEY ||
    VITE_SUPABASE_PUBLISHABLE_KEY ||
    'sb_publishable_4WnB8WbCjosSz5nRESpiOQ_N256uBdL';

export const supabase = createClient(supabaseUrl, supabaseKey);