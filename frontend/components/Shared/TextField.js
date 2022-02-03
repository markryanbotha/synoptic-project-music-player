import { useEffect } from "react"
import { TextField } from "@mui/material"

const FormTextField = ({
    id,
    name,
    initialValue = "",
    errors,
    register,
    setValue,
}) => {
    useEffect(() => {
        setValue(id, initialValue, { shouldValidate: true })
    }, [initialValue])

    const handleTyping = (event) => {
        setValue(id, event.target.value, { shouldValidate: true })
    }

    return (
        <TextField
            label={name}
            variant="standard"
            error={errors ? true : false}
            helperText={errors?.type}
            {...register(id, {
                required: true,
                onChange: (e) => handleTyping(e),
            })}
        />
    )
}

export default FormTextField
