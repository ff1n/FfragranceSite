# Google Login

[![npm version](https://badge.fury.io/js/google-login.svg)](https://badge.fury.io/js/google-login)

Introducing `google-login`, a powerful npm package designed to simplify the implementation of Google login functionality in your React application. With this lightweight and well-maintained package, you can effortlessly integrate Google login, allowing your users to sign in with their Google accounts.

By utilizing the `google-login` package, you can provide a seamless social login experience for your users, enhancing the usability of your application. Whether you're building a social networking platform, an e-commerce site, or any other application that requires user authentication, `google-login` has got you covered.

With support for Google.com login, users can conveniently log in using their existing Google accounts. Additionally, the package facilitates easy integration with Gmail sign up, enabling users to create new accounts quickly and securely.

The `google-login` package is built with maintainability in mind, ensuring that it stays up-to-date with the latest industry standards and Google API changes. It boasts a minimal footprint and has minimal dependencies, making it an efficient choice for your React projects.

Key Features:

- Seamlessly integrate Google login into your React application
- Support for social login via Google accounts
- Enable users to log in with their Google.com credentials
- Simplify Gmail sign up process for new users
- Enhance user authentication and account security
- Well-maintained and actively supported package
- Lightweight, with minimal dependencies
- Provides easy configuration options for customization
- Compatible with the latest React versions and best practices
- Empower your application with React Google authentication capabilities

With `google-login`, you can unlock the power of Google authentication in your React application, improving user engagement and streamlining the login process. Don't miss out on the opportunity to leverage this versatile npm package for seamless integration of Google login functionality.

Try out `google-login` today and join the ranks of developers benefiting from its simplicity, reliability, and extensive feature set.

## Installation

You can install the `google-login` package via npm:

```shell
npm install google-login
```

## Usage

Here's an example of how you can use the `GoogleLogin` component provided by this package:

```jsx
import React from "react";
import GoogleLogin from "google-login";

const handleGoogle = (response) => {
  // Handle the Google login response
};

const App = () => {
  return (
    <div>
      <h1>Google Login Example</h1>
      <GoogleLogin
        config={{
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleGoogle,
        }}
        btnConfig={{
          type: "standard",
          theme: "filled_blue",
          size: "large",
          text: "signin_with",
          shape: "rectangular",
        }}
      />
    </div>
  );
};

export default App;
```

Make sure to replace `process.env.REACT_APP_GOOGLE_CLIENT_ID` with your actual Google OAuth client ID.

## Features

- Lightweight package with minimal dependencies.
- Well-maintained and actively supported.
- Easy integration of Google login functionality in your React application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

We hope you find the `google-login` package useful for implementing Google login in your React application. If you encounter any issues or have suggestions for improvement, please don't hesitate to [report them](https://github.com/jnikhil652/google-login/issues). Contributions are also welcome!
