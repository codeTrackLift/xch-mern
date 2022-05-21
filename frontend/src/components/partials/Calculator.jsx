import { useEffect, useState } from 'react';
import { Button, Card, Collapse, Row } from 'react-bootstrap';
import { useFormik} from 'formik';

const errorStyle = {
    color: 'red'
}

const Select = ({data, type, value, setValue, setUnit}) => {
    const options = Object.keys(data).map(function(key, i) {
        return (
            <option 
                key={i} 
                value={data[key].value + ';' + data[key].unit}
            >
                {data[key].name}: {data[key].unit} {data[key].value.toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2})}
            </option>
        )
    })
    
    return (
        <select 
            className='w-100' 
            id={type}
            onChange={(e) => {setValue(e.currentTarget.value.split(';')[0]); setUnit(e.currentTarget.value.split(';')[1])}}
        >
            <option value=''>--Select One</option>
            {options}
        </select>
    )
}

const buttonStyle = {
    backgroundColor: 'transparent',
    paddingBlock: 0,
    color: 'cornflowerblue',
    borderRadius: '0',
    margin: '0 auto',
    paddingTop: '0.5rem',
    width: '100%',
    fontVariant: 'small-caps',
}

const cardStyle = {
    borderTop: '10px solid cornflowerblue',
}

export const Calculator = ({data}) => {
    const [startValue, setStartValue] = useState('');
    const [startUnit, setStartUnit] = useState('');
    const [endValue, setEndValue] = useState('');
    const [endUnit, setEndUnit] = useState('');
    const [open, setOpen] = useState(false);

    const validate = values => {
        let errors = {};
        if(!values.valueField || values.valueField < 0.01) {
            errors.value = 'is invalid*';
        } 
        if(values.valueField < 0) {
            errors.value = 'cannot be negative*'
        } 
        if(isNaN(values.valueField) && values.valueField !== '-') {
            errors.value = 'is not a number*'
        } 
        return errors;
    }

    const formik = useFormik({
        initialValues: {
            valueField: '',
            noteField: '',
        },
        validate,
        onSubmit: (values, {resetForm}) => {
            console.log(values);
            resetForm();
        }, 
    });

    const resetCalc = () => {
        setStartValue('');
        setStartUnit('');
        setEndValue('');
        setEndUnit('');
        formik.resetForm();
    }

    return (
        <div className='w-100 text-center'>
            <Button
                id='calculator-button'
                onClick={() => {
                    setOpen(!open);
                    if (open) {
                        resetCalc();
                    }
                }}
                aria-controls='calculator'
                aria-expanded={open}
                style={buttonStyle}
                variant='secondary-outline'
            >
                { open ? 'Close Currency Calculator' : 'Show Currency Calculator' }
            </Button>
            <Collapse in={open}>
                <Card id='calculator' style={cardStyle}>
                    <Card.Body>
                        <Row>
                            <div className='col-sm-6 my-2'>
                                <p className='text-start'>
                                    <span className='fw-bolder'>
                                        Starting Currency: 
                                    </span>
                                </p>
                                <Select 
                                    data={data} 
                                    type={'startConvert'} 
                                    value={startValue}
                                    setValue={setStartValue}
                                    setUnit={setStartUnit}
                                /> 
                            </div>

                            <div className='col-sm-6 my-2'>
                                <p className='text-start'>
                                    <span className='fw-bolder'>
                                        Ending Currency: 
                                    </span>
                                </p>
                                <Select 
                                    data={data} 
                                    type={'endConvert'} 
                                    value={endValue}    
                                    setValue={setEndValue}
                                    setUnit={setEndUnit}
                                /> 
                            </div>
                            
                        </Row>
                        <Row>
                            <div className='col-sm-4 my-2'>
                                <p className='text-start mb-0'>
                                    <span className='fw-bolder'>Amount: </span> 
                                    {formik.touched.valueField && formik.errors.value ? (
                                        <span id='valueError' style={errorStyle}>{formik.errors.value}</span>
                                    ) : null}
                                </p>
                                <input 
                                    id='valueField' 
                                    type='number' 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur}
                                    value={formik.values.valueField}
                                    className='w-100'
                                    style={{borderWidth:'1px'}}
                                />
                            </div>
                            {
                                (startValue && endValue) &&
                                <div className='col-sm-8 text-start row my-2'>
                                    <div className='col-sm-6 my-2'>
                                        <span className='fw-bolder'>Rate: </span> {startUnit} to {endUnit}<br/>
                                        {(Number(startValue) / Number(endValue)).toFixed(10)}
                                    </div>
                                    <div className='col-sm-6 my-2'>
                                        <span className='fw-bolder'>Converted Amount: </span><br/>
                                        <span>
                                            {endUnit} {(formik.values.valueField / (Number(startValue) / Number(endValue))).toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2})}
                                        </span>
                                    </div>
                                </div>
                            }
                        </Row>
                    </Card.Body>
                </Card>
            </Collapse>
        </div>
    )
}