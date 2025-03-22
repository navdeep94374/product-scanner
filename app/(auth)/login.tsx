import { Link } from "expo-router";
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

// Validation Schema using Yup
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginScreen = () => {
  return (
    <View className={`flex-1 gap-7 bg-white p-5 py-20`}>
      <View className="flex gap-3">
        <Text className={`text-4xl font-bold text-left`}>
          Welcome again, Login to your account
        </Text>

        <Link href={"/signup"} className={`text-blue-500 text-lg`}>
          Don't have an account? Sign up
        </Link>
      </View>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          console.log("Login Data:", values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View className="flex gap-5">
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
                Login
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;
