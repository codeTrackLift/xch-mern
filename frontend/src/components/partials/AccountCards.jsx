const accountCardStyle = {
    margin: '3rem auto',
    width: '20rem',
    maxWidth: '90vw',
    border: '1px solid black',
    borderRadius: '2px',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
}

const cardHeaderStyle = {
    margin: '-0.05rem -0.05rem 0 -0.05rem',
    backgroundColor: 'rgb(50,50,50)',
    color: 'white',
    textShadow: '1px 1px 1px black',
    fontVariant: 'small-caps',
}

const bodyStyle = {
    color: 'black',
}

export const AccountCard = (props) =>{
    function classes(){
        const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
        const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
        return 'card mb-3 ' + bg + txt;
    }
  
    return (
        <div className={classes()} style={accountCardStyle}>
            <div className="card-header" style={cardHeaderStyle}>{props.header}</div>
            <div className="card-body" style={bodyStyle}>
                {props.title && (<h5 className="card-title">{props.title}</h5>)}
                {props.text && (<p className="card-text">{props.text}</p>)}
                {props.body}
                {props.status && (<div id='createStatus'>{props.status}</div>)}
            </div>
        </div>      
    );    
}

export const LogInCard = (props) =>{
    function classes(){
        const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
        const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
        return 'card mb-3 ' + bg + txt;
    }
  
    return (
        <div className={classes()} style={accountCardStyle}>
            <div className="card-header" style={cardHeaderStyle}>{props.header}</div>
            <div className="card-body" style={bodyStyle}>
                {props.title && (<h5 className="card-title">{props.title}</h5>)}
                {props.text && (<p className="card-text">{props.text}</p>)}
                {props.body}
            </div>
        </div>      
    );    
}