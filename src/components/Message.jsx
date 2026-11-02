export const Message = ({ type, children }) => (
    <div className={`alert alert-${type} my-3`}>
        {children}
    </div>
);