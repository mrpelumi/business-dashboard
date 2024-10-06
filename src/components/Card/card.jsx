

const Card = ({bgColor, title, value}) => {
  return (
    <div className={"shadow-md rounded-md flex flex-col gap-6 p-6 pl-10 pr-20 ".concat(bgColor)}>
      <span className="text-md text-white font-normal">{title}</span>
      <span className="text-2xl font-semibold text-white">{value}</span>
    </div>
  )
}

export default Card;