const SignUpErrorPrinter = ({errors}) => {
    return (
        <ul>
        {errors.map((error) => {
            return (
                <li>{error}</li>
            )
        })}
        </ul>
    )
}

export default SignUpErrorPrinter;