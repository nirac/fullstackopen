const Course = ({course}) => {
    const Header = ({ name }) => {
        return (
            <h1>{name}</h1>
        )
    }

   const Total = ({ parts }) => {
        const total = parts.reduce((sum, part) => {
            return sum + part.exercises;
        },0);

       return (
           <p>
           Number of exercises {total}
       </p>
       )
   }

    const Part = ({ part }) => {
        return (
            <p>
                {part.name} {part.exercises}
            </p>)
    }


    const Content = ({parts}) => {
        return(
        <>
            {parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </>)
    }

    return(
        <>
            <Header name={course.name}/>
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course