import * as React from 'react';
import { ErrorMsg } from './../../components';
import { useForm } from "react-hook-form";

export default function DoctorAppointment({ medicalCenters, initAppointment, values }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: values
    });

    return (<div class="container-width-sm py-5">
        <form id="form-appointment-start" onSubmit={handleSubmit(initAppointment)}>
            <div class="form-group">
                <label>Please select medical center</label>
                <select class="form-control" {...register('medical_center', {
                    required: "Select medical center"
                })}>
                    <option value="">- Select -</option>
                    {medicalCenters && medicalCenters.map((row, index) =>
                        <option key={row.id} value={row.uuid}>{row.name}</option>)}
                </select>
                <ErrorMsg errors={errors} name="medical_center" />
            </div>

            <div class="form-group">
                <label>Provide the reason for appointment</label>
                <textarea class="form-control" style={{ resize: 'none', height: '100px' }}
                    {...register('reason', {
                        required: "Provide reason for appointment"
                    })} ></textarea>
                <ErrorMsg errors={errors} name="reason" />
            </div>

            <button type="submit" class="btn btn-primary btn-arrow btn-lg btn-main">
                Proceed
            </button>
        </form>
    </div>);
}