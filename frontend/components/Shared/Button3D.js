const Button3D = ({ children, className = null, ...props }) => {
    return (
        <div className={className}>
            <button {...props} className="button-3d-button">
                <span className="button-3d-span">{children}</span>
            </button>
        </div>
    )
}

export default Button3D
