
const Button = ({ onClick, children }) => {
    return (
      <button
        onClick={onClick}
        className="bg-[#301d8b] text-white font-medium leading-6 text-xl mt-5 px-12 py-3 rounded-md self-end "
      >
        {children}
      </button>
    )
  }
  
  export default Button