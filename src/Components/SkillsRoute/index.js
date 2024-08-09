const RenderSkills = props => {
  const {each} = props
  const {name, skillUrl} = each

  return (
    <li className="skillsItem">
      <img src={skillUrl} className="skill-img" alt={name} />
      <p className="skill-text">{name}</p>
    </li>
  )
}

export default RenderSkills
