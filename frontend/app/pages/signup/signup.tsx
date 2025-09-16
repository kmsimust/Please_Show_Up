import '~/App.css'
import bgImg from '~/images/login-background.png'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form';
import AxiosInstance from '~/components/AxoisInstance';
import { useNavigate } from 'react-router-dom';
import MyButton from '~/components/forms/Button';
import MyPassField from '~/components/forms/PassField';
import MyTextField from '~/components/forms/TextField';
import axios from 'axios';


type FormProps = {
  email: string,
  username: string,
  password: string
}
export function Signup() {

  // const navigate = useNavigate()

  const {handleSubmit, control} = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  const handleSubmitForm = (data: FormProps) => {
    console.log(data)

    AxiosInstance.post('/register/', data).then((res) => {
      console.log(res.data)
    })
  }

  return (
    // background
    <div
      style={{
        margin: 0,
        padding: 0,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('"+bgImg+"')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "Arial, sans-serif",
      }}>
      {/**/}
      <div
        style={{
          margin: 0,
          padding: 0,
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* sign-up case box */}
        <div
          style={{
            width: "400px",
            padding: "30px",
            background: "#e0e0e0",
            border: "3px solid #9c27b0",
            textAlign: "center",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <h2
            style={{
              marginBottom: "25px",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            Sign up
          </h2>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Controller
            name='username'
            control={control}
            render={({field}) => (
                <input
                {...field}
                  type="text"
                  placeholder="Enter your username"
                  required
                  style={{
                    width: "100%",
                    padding: "14px",
                    margin: "10px 0",
                    border: "none",
                    background: "#fff",
                    fontSize: "16px",
                    fontWeight: "bold",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                />
              )                
            } //render username endpoint         
            />

            <Controller
            name='email'
            control={control}
            render={({field}) => (
                <input
                {...field}
                  type="email"
                  placeholder="Enter your email"
                  required
                  style={{
                    width: "100%",
                    padding: "14px",
                    margin: "10px 0",
                    border: "none",
                    background: "#fff",
                    fontSize: "16px",
                    fontWeight: "bold",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                />
              )
            }
            />

            <Controller
            name='password'
            control={control}
            render={({field}) => (
                <input
                {...field}
                  type="password"
                  placeholder="Enter your Password"
                  required
                  style={{
                    width: "100%",
                    padding: "14px",
                    margin: "10px 0",
                    border: "none",
                    background: "#fff",
                    fontSize: "16px",
                    fontWeight: "bold",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                />
               )
              }
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                background: "#00c853",
                color: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
                marginTop: "12px",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            >
              Sign up
            </button>

          </form> {/*handle submit form endpoint*/}

          <div
            style={{
              marginTop: "18px",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            Already have an account?{" "}
            <a href="/login" style={{ color: "#00a843", textDecoration: "none" }}>
              login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
