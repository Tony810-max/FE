import { useFormContext } from 'react-hook-form';
import styles from './InputForm.module.scss'

export default function InputForm(props) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className='w-full'>
      {errors[props.name] && <p className={styles.errorMessage}>{errors[props.name].message}</p>}
      <input {...register(props.name)} type={props.type} name={props.name} className={props.className} placeholder={props.placeholder} {...props} />
    </div>
  );
}
