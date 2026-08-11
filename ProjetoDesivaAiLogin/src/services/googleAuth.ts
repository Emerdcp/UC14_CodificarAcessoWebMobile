import { GoogleSignin } from "@react-native-google-signin/google-signin";

export function configurarGoogle() {
  GoogleSignin.configure({
    webClientId:
      "575970714704-do1ahaa2b6ajirqt3gqtdsf57avnnv00.apps.googleusercontent.com",
  });
}

export async function loginComGoogle() {
  try {
    await GoogleSignin.hasPlayServices();

    const response = await GoogleSignin.signIn();

    return response;

  } catch (error) {
    console.error("Erro no login Google:", error);

    throw error;
  }
}

