import { Image } from 'react-native';
import { LogoProps } from './types';
import { style } from './style';

export default function Logo({
    size = 140
}:LogoProps){

    return(
        <Image
            source={require('../../../assets/images/logo.png')}
            style={[
                style.image,
                {
                    width:size,
                    height:size
                }
            ]}
        />
    );
}