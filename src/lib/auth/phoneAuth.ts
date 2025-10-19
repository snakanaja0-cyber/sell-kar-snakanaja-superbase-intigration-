import { supabase } from '../supabase';

export const phoneAuth = {
  async sendOTP(phoneNumber: string): Promise<void> {
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;

    const { error } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
    });

    if (error) throw error;
  },

  async verifyOTP(phoneNumber: string, otp: string): Promise<void> {
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;

    const { error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: otp,
      type: 'sms',
    });

    if (error) throw error;
  },

  async resendOTP(phoneNumber: string): Promise<void> {
    await this.sendOTP(phoneNumber);
  },
};
