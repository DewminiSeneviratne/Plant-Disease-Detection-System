import 'package:crops_ai/screens/signin_screen.dart';
import 'package:flutter/material.dart';
//import 'package:untitled/basic_treatments.dart';
// import 'package:untitled/home_page.dart';
// import 'package:untitled/report_page.dart';
// import 'package:untitled/sign_up.dart';
// import 'package:untitled/signed_up.dart';
// import 'package:untitled/trial.dart';
//import 'package:untitled/testing.dart';
//import 'package:untitled/upload_photo.dart';

// import 'error_page.dart';
import 'signin_screen.dart';
import '../main.dart';

class Splash extends StatefulWidget {
  const Splash({Key? key}) : super(key: key);

  @override
  State<Splash> createState() => _SplashState();
}

class _SplashState extends State<Splash> {
  @override
  void initState() {
    super.initState();
    _navigatetologin();
  }

  _navigatetologin() async {
    await Future.delayed(const Duration(milliseconds: 3000), () {});
    Navigator.pushReplacement(
        context, MaterialPageRoute(builder: (context) => const SignInScreen()));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor:
          const Color(0xFFFFFFFF), // change last 6 digits for color
      body: Center(
        child: Container(
            child: Image.asset(
          'assets/images/logo.png',
          height: 800,
          width: 800,
        )),
      ),
    );
  }
}
