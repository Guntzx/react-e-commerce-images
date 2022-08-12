import { useField } from "formik";
import { Control, Label, MyInput, ErrorMessage } from "../Styled/Input";

const Input = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <Control>
            <Label>{label}</Label>
            <MyInput {...field} {...props} />
            {meta.touched && meta.error ? (
                <ErrorMessage>{meta.error}</ErrorMessage>
            ) : null}
        </Control>
    )
}

export default Input