import { Button, Card } from 'react-bootstrap';

const cardStyle = {
    margin: '2rem auto',
    padding: '0 0.5rem',
    width: '18rem',
    maxWidth: '90vw',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
}

const cardHeaderStyle = {
    backgroundColor: 'rgb(50,50,50)',
    margin: '0rem -0.55rem 0 -0.55rem',
    color: 'white',
    textShadow: '1px 1px 1px black',
    fontVariant: 'small-caps',
}

export const HomeCard = ({id, header, title, text1, text2, btnClass, href, btnText}) => {
    
    return (
        <Card className='col-sm-3' style={cardStyle}>
            <Card.Header style={cardHeaderStyle}>{header}</Card.Header>
            <Card.Body>
                <Card.Title>
                    {title}
                </Card.Title>
                <Card.Text>
                    {text1}
                </Card.Text>
                <Card.Text>
                    {text2}
                </Card.Text>
                <Button id={id} className={btnClass} href={href} target='_blank' rel='noreferrer'>{btnText}</Button>
            </Card.Body>
        </Card>
    )
}