export default function colorCaptial ({ text = '' }) {
  const [firstLetter, ...restOfText] = text.split(' ')
  return (
    <>
      <span className='text-color1 mr-1'> {firstLetter} </span>
      {restOfText.join(' ')}
    </>
  )
}
