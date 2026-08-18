import { GoogleSignin } from "@react-native-google-signin/google-signin";

export function configurarGoogle() {

    console.log("Configurando Google Sign-In...");

    GoogleSignin.configure({

        webClientId:
            "575970714704-do1ahaa2b6ajirqt3gqtdsf57avnnv00.apps.googleusercontent.com",

    });

    // console.log("Google Sign-In configurado.");
    console.log("Google: login realizado com sucesso.");
}


export async function loginComGoogle() {

    try {

        console.log("Google: verificando Play Services...");

        await GoogleSignin.hasPlayServices();

        console.log("Google: Play Services OK.");

        console.log("Google: abrindo login...");

        const response = await GoogleSignin.signIn();

        // console.log(
        //     "Google: login retornou:",
        //     response
        // );

        return response;

    } catch (error) {

        console.error(
            "Google: ERRO NO LOGIN:",
            error
        );

        throw error;
    }
}

// import { GoogleSignin } from "@react-native-google-signin/google-signin";

// export function configurarGoogle() {
//   GoogleSignin.configure({
//     webClientId:
//       "575970714704-do1ahaa2b6ajirqt3gqtdsf57avnnv00.apps.googleusercontent.com",
//   });
// }

// export async function loginComGoogle() {
//   try {
//     await GoogleSignin.hasPlayServices();

//     const response = await GoogleSignin.signIn();

//     return response;

//   } catch (error) {
//     console.error("Erro no login Google:", error);

//     throw error;
//   }
// }

