import { Link } from "expo-router";
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/http/axiosConfig";
import Toast from "react-native-toast-message";



// Validation Schema using Yup
const signupSchema = Yup.object().shape({
  name:Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const SignupScreen = () => {
  const {isPending,data:user,mutate:createUser,isError,error,isSuccess} = useMutation({
    mutationKey:["signup"],
    mutationFn : async ({email,password,name} : {email:string,password:string,name:string})=>{
      const res = await api.post("/user/signup",{email,password,name});
      console.log(res)
      return res.data;
    }
  })

  if(isSuccess){
    Toast.show({type:"success","text1":user?.msg})
  }

  if(error){
    Toast.show({type:"error","text1":error.message})
  }

  return (
    <View className={`flex-1 gap-7 bg-white p-5 py-20`}>
      <View className="flex gap-3">
        <Text className={`text-4xl font-bold text-left`}>
          Create your account
        </Text>

        <Link href={"/(auth)/login"} className={`text-blue-500 text-lg`}>
          Already have account? Login
        </Link>
      </View>

      <Formik
        initialValues={{ email: "", password: "",name:"" }}
        validationSchema={signupSchema}
        onSubmit={(values) => {
          createUser(values)
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View className="flex gap-5">
             <View className={`w-full flex gap-2`}>
              <Text className={`text-gray-700 text-lg`}>Name</Text>
              <TextInput
                className={`border border-gray-300 rounded-md py-3 px-4 w-full text-lg`}
                placeholder="John doe"
                autoCapitalize="none"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              {touched.name && errors.name && (
                <Text className="text-red-500">{errors.name}</Text>
              )}
            </View>

            {/* Email Field */}
            <View className={`w-full flex gap-2`}>
              <Text className={`text-gray-700 text-lg`}>Email</Text>
              <TextInput
                className={`border border-gray-300 rounded-md py-3 px-4 w-full text-lg`}
                placeholder="abc@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text className="text-red-500">{errors.email}</Text>
              )}
            </View>

            {/* Password Field */}
            <View className={`w-full flex gap-2`}>
              <Text className={`text-gray-700 text-lg`}>Password</Text>
              <TextInput
                className={`border border-gray-300 rounded-md py-3 px-4 w-full text-lg`}
                placeholder="Enter password"
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text className="text-red-500">{errors.password}</Text>
              )}
            </View>

            {/* Forgot Password */}
            <View className={`flex w-full`}>
              <TouchableOpacity className="self-end">
                <Text className={`text-blue-500`}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              className={`bg-gray-800 rounded-md py-3 px-6 w-full`}
              onPress={()=>{
                handleSubmit()
              }}
            >
              <Text className={`text-white text-center font-semibold text-xl`}>
               {isPending ? "Loading..." : "Signup"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    
       <Toast />
    </View>
  );
};

export default SignupScreen;
