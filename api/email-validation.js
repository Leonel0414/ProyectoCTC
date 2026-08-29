import Emailvalidation from 'https://esm.sh/@everapi/emailvalidation-js'

const client = new Emailvalidation('ema_live_rUZi3bb4IF4Zo9ODW26Zo8jHQKPETJm3Cc35mLB3');

export async function informacionEmail(email){
    try{
        let info = await client.info(`${email}`,{
        catch_all: 0
        })

        if(!info.ok){
            if(info.status === 404)
            throw new Error(`Error HTTP: Error de EndPoint  ${info.status}`);

            if(info.status === 422){
                throw new Error(`Error HTTP: Error de validacion ${info.status}`)
            }

            if(info.status === 500){
                throw new Error(`Error HTTP: Error de servidor ${info.status}`)
            }
        }

        return info;
    }
    catch(error){
        console.log(error)
        throw error;
    }
}

