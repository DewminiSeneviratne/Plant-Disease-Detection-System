import 'package:crops_ai/screens/launch_screen.dart';
import 'package:crops_ai/screens/splash_screen.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    name: 'plant-disease-detection-system',
    options: const FirebaseOptions(
      apiKey: "AIzaSyCs7bBCj36dw8SnZpHrkWbU8UDoOdb7DcA",
      appId: "1:663284861086:android:2532a98633891899f8938f",
      messagingSenderId: "663284861086",
      projectId: "plant-disease-detection-system",
    ),
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Crops AI',
      debugShowCheckedModeBanner: false,
      home: Splash(),
    );
  }
}
