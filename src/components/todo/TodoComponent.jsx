import { useParams, useNavigate } from "react-router-dom";
import { retrieveTodoApi, updateTodoApi, createTodoApi } from "./api/TodoApiService";
import { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage} from "formik";
import moment from "moment";

export default function TodoComponent() {

    const[description, setDescription] = useState('')
    const[targetDate, setTargetDate] = useState('')

    const { username, id } = useParams();

    const navigate = useNavigate()

    useEffect(() => {
    retrieveTodo();
    }, [id])

    function retrieveTodo() {
        if(id != -1){
            retrieveTodoApi(username, id)
                .then(response => (setDescription(response.data.description), setTargetDate(response.data.targetDate)))
                .catch(error => console.log(error))
        }
    }

    function onSubmit(values) {
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        if(id == -1) {
            createTodoApi(username, todo)
                .then(response => navigate(`/todos/${username}`))
                .catch(error => console.log(error))
        } else{
            updateTodoApi(username, id, todo)
                .then(response => navigate(`/todos/${username}`))
                .catch(error => console.log(error))
        }
    }

    function validate(values) {
        let errors = {}
        if(values.description.length <5) {
        errors.description = 'Enter at least 5 characters in description'
        }
        if(values.targetDate === null || values.targetDate === '' || !moment(values.targetDate).isValid()) {
        errors.targetDate = 'Enter a valid date'
        }
        return errors
    }

    return (
    <div className="container">
        <h1>Enter Todo Details</h1>
        <div>
           <Formik initialValues={{ description, targetDate }}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
            >
            {
                (props)=>(
                    <Form>
                        <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                        <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                        <fieldset className="form-group">
                            <label>Description</label>
                            <Field className="form-control" name="description" />
                        </fieldset>
                        <fieldset className="form-group">
                            <label>Target Date</label>
                            <Field className="form-control" name="targetDate" type = "date" />
                        </fieldset>
                        <div>
                            <button className="btn btn-success m-5" type="submit">Save</button>
                        </div>
                    </Form>)
            }
           </Formik>
        </div>
    </div>
    );
}