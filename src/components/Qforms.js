import * as React from 'react';
import AppContext from '../context';

export default function Qforms({ data, register, ErrorMsg, errors, getValues, lengthValidate }) {
    //const { } = React.useContext(AppContext);

    switch (data?.field_type) {
        case 'textfield':
            return (<div className="form-group">
                <label>{data?.question}</label>
                <input type="text" className="form-control"
                    name={`${data.key}`}
                    ref={register({
                        required: "Field is required!"
                    })}
                />
                <ErrorMsg errors={errors} name={`${data.key}`} />
            </div>)

        case 'textarea':
            return (<div className="form-group">
                <label>{data?.question}</label>
                <textarea className="form-control"
                    name={`${data.key}`}
                    ref={register({
                        required: "Field is required!"
                    })}></textarea>
                <ErrorMsg errors={errors} name={`${data.key}`} />
            </div>)

        case 'select':
            return (<div className="form-group">
                <label>{data?.question}</label>
                <select className="form-control"
                    name={`${data.key}`}
                    ref={register({
                        required: "Field is required!"
                    })}>
                    <option value=""> - Select -</option>
                    {data?.options && data.options.length > 0 && data.options.map((dt, index) => {
                        return (<option key={index} value={dt.name}>{dt.name}</option>)
                    })}
                </select>
                <ErrorMsg errors={errors} name={`${data.key}`} />
            </div>)

        case 'file':
            return (<div className="form-group">
                <label>{data?.question}</label>
                <div className="custom-file">
                    <input type="file"
                        className="custom-file-input" id={data.key}
                        name={`${data.key}`}
                        ref={register({
                            required: "Field is required!"
                        })}
                    />
                    <label className="custom-file-label" htmlFor={data.key}>Choose file</label>
                </div>
                <ErrorMsg errors={errors} name={`${data.key}`} />
            </div>)

        case 'radio':
            return (<div className="form-group">
                <label>{data?.question}</label>
                {data?.options && data.options.length > 0 && data.options.map((dt, index) => {
                    return (<div key={index} className="custom-control custom-radio mb-2">
                        <input type="radio"
                            id={`radio-${data.key}-${index}`}
                            name={`${data.key}`}
                            value={dt.name}
                            ref={register({
                                required: "Field is required!"
                            })}
                            className="custom-control-input" />
                        <label className="custom-control-label" htmlFor={`radio-${data.key}-${index}`}>{dt.name}</label>
                    </div>)
                })}
                <ErrorMsg errors={errors} name={`${data.key}`} />
            </div>)

        case 'checkbox':
            return (<div className="form-group">
                <label>{data?.question}</label>
                {data?.options && data.options.length > 0 && data.options.map((dt, index) => {
                    return (<div key={index} className="custom-control custom-checkbox mb-2">
                        <input
                            type="checkbox"
                            name={`${data.key}`}
                            id={`checkbox-${data.key}-${index}`}
                            value={dt.name}
                            ref={register({
                                validate: () => lengthValidate(getValues, data.key, 'Select at least one option')
                            })}
                            className="custom-control-input" />
                        <label className="custom-control-label" htmlFor={`checkbox-${data.key}-${index}`}>{dt.name}</label>
                    </div>)
                })}
                <ErrorMsg errors={errors} name={`${data.key}`} />
            </div>)

        default:
            return (<div />)

    }
}