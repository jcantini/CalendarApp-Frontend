

export const getEnvVariables = () => {
  //  import.meta.env; // forma de importar las variables de entorno en vite (1)
    
    return  {
    //    ...import.meta.env // las devuelvo esparcidas (2)
        VITE_API_URL: import.meta.env.VITE_API_URL, //(3)
    }
}

/*
(3)
Tuve que comentar (1) y (2) xq vite da un error al correr yarn build. Es un error de vite que lo estan x 
solucionar. Mientras tanto tengo que importar cada varible de entorne definida en .env de la forma 
que se muestre en (3)
*/