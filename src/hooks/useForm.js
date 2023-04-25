// Este es un mi custom hook que sirve para usarlo como un template de un formulario con inputs.
// Esta version agrega las validaciones de los campos en forma dinámica.

import { useEffect, useMemo, useState } from "react";    

export const useForm = ( initialForm = {}, formValidations = {} ) => {
    // recibo como argumento la estructura de campos que tiene el formulario que usa este hook
    
    const [ formState, setFormState ] = useState( initialForm );

    // El siguiente state es para guardar la info de si hay un error en un campo o no. Como si hay un error
    // necesito que se redibuje el form, necesito usar un hook que maneje el state.  
    const [ formValidation, setFormValidation ] = useState( {} );

    useEffect(() => { // disparo la función de validación cada vez que algo cambie en el estado del form
        createValidators();
    }, [ formState ]);

    useEffect(() => {
        setFormState( initialForm ); // renderizo el form cada vez que la nota activa cambie
    }, [ initialForm ]); // cuando la nota activa cambia, el initialForm cambia

    // Verifico si el form no tiene ningún error esto implica que todos los campos validados tiene su
    // value = null. Uso un useMemo para que solo se evalue si cambia algo en el formValidation. Es buena práctica.
    const isFormValid = useMemo( () => {
        for ( const formValue of Object.keys( formValidation ) ) {
            if ( formValidation[formValue] !== null ) return false;
        }
        return true;
    }, [ formValidation ]) 

    const onInputChange = ({ target }) => { // Desestructuro el target del evento que recibo
        const {name, value } = target;  // Ahora del target desestructuro del input el nombre  y su valor
        setFormState({ 
            ...formState,
            [ name ]: value // propiedad computada uso [] para interpretar name como nombre de la propiedad
        });
    }

    const onResetForm = () => {
        setFormState( initialForm )
    }

    const createValidators = () => { // (2)

        const formCheckedValues = {}; // Para guardar el resultado de las validaciones

        for (const formField of Object.keys( formValidations )) {

            const [ fn, errorMessage ] = formValidations[formField]; // desestructuro el array 

            formCheckedValues[`${ formField }Valid`] = fn( formState[formField]) ? null: errorMessage; // (3)
        }

        setFormValidation( formCheckedValues ); // guardo el estado de los errores para que se redibuje el form
    }

    return {
        ...formState, // (1)
        formState,
        onInputChange,
        onResetForm,
        ...formValidation, // (4)
        isFormValid
    }
}

// (1)
// el ...formstate es para que me devuelva las propiedades del objeto formState de forma desestructurada. De 
// esta manera al definir useForm en un componente puedo usar directamente un objeto con los nombre de los campos.
// Aí está hecho en TodoAdd.jsx
// La otra forma es recibir directamente "formState" y desestructurarlo en otra constante como está hecho en
// FormWithCustomerHook.jsx o en la misma línea de la siguiente forma:
// const {formState: {description}, onInputChange, onResetForm} = ...

// (2)
// createValidators va a tomar el objeto formValidations y crea un nuevo estado en el cual me 
// permitirá saber si los inputs son válidos o no.
// Voy a recorre el objeto para obtener cada una de sus propiedades que los los campos a validar.

// (3)
// Creo una propiedad en formCheckedValues con nombre computado por eso los [] que es el 
// nombre del campo + Valid que contendra el mensaje de error. El valor que le asigno a esta 
// propiedad es la ejecución de la función a la que le paso como argumento es el valor del campo a validar
// que tambien lo paso de forma computada. Aplico la función y si me devuelve true implica que la validación 
// es correcta por lo que devuelvo null si da false mando el mensaje de error.

// (4)
// Devuelvo el objeto de los campos validados todo desestructurado. Cada propiedad tiene el nombre del
// campo + Valid y como valor null si no tiene error o el texto si tiene error.