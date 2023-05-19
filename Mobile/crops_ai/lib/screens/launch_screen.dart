// ignore_for_file: library_private_types_in_public_api

//import 'dart:html';

import 'dart:convert';

import 'package:crops_ai/screens/result_page.dart';
import 'package:crops_ai/screens/signin_screen.dart';
import 'package:crops_ai/screens/test_screen.dart';
import 'package:flutter/material.dart';

import 'package:http/http.dart' as http;

//import 'package:mobile_app/error_page.dart';
//import 'package:mobile_app/report_page.dart';
//import 'package:mobile_app/upload_photo.dart';

import 'dart:io';
import 'package:path/path.dart' as path;
import 'package:image_picker/image_picker.dart';

class LaunchScreen extends StatefulWidget {
  const LaunchScreen({super.key});

  @override
  _LaunchScreenState createState() => _LaunchScreenState();
}

class _LaunchScreenState extends State<LaunchScreen> {
  Future<String> predictPlantDisease(String imagePath) async {
    var request = http.MultipartRequest(
        'POST', Uri.parse('http://localhost:8000/predict'));
    var pic = await http.MultipartFile.fromPath("image", imagePath);
    request.files.add(pic);
    var response = await request.send();
    var responseData = await response.stream.toBytes();
    var responseString = String.fromCharCodes(responseData);
    return responseString;
  }

  File? _image;
  String? _predictionResult; // Added new variable to store prediction result
  double? _confidence;
  String? _disease;

  Future<void> _getImageAndPredict() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(
        source: ImageSource.gallery); // Changed source to ImageSource.gallery

    if (pickedFile != null) {
      final imageFile = File(pickedFile.path);
      await predictPlantDisease2(imageFile);
      setState(() {
        _image = imageFile;
      });
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => Result(
            predictionResult: _predictionResult!,
            confidence: _confidence!,
            diseases: _disease!,
          ),
        ),
      );
    } else {
      print('No image selected.');
    }
  }

  Future<void> predictPlantDisease2(File imageFile) async {
    final url = 'http://192.168.8.131:8000/predict';

    // Create a multipart request with a single file part
    final request = http.MultipartRequest('POST', Uri.parse(url));
    request.files.add(
      http.MultipartFile(
        'file',
        imageFile.readAsBytes().asStream(),
        imageFile.lengthSync(),
        filename: path.basename(imageFile.path),
      ),
    );

    // Send the request and wait for the response
    final response = await http.Response.fromStream(await request.send());
    if (response.statusCode == 200) {
      print("inString start");
      // Parse the response and handle the result
      final result = response.body.split(",");
      final predictionResult = result[0].replaceAll(RegExp(r'[\[\]" ]'), '');
      Map<String, dynamic> jsonMap = json.decode(response.body);
      final diseases = jsonMap['class'];
      print(diseases);
      print("inString 1");

      String confidenceString = result[1].replaceAll(']', '').trim();
      print("inString 1.5");
      String confidenceString2 = confidenceString.replaceAll('}', '').trim();
      String confidenceString3 =
          confidenceString2.replaceAll('confidence:', '').trim();

      String confidenceString4 = confidenceString3.substring(13, 19);

      print("String value $confidenceString3");
      print("Final String $confidenceString4");

      double d = double.parse(confidenceString4);
      print("inString 3");
      //String inString = d.toStringAsFixed(2); // '2.35'
      //_confidence = double.parse(inString); // 2.35
      print("inString");

      print(result);
      setState(() {
        _predictionResult = predictionResult;
        _disease = diseases;
        //String confidenceString = result[1].replaceAll(']', '').trim();
        //_confidence = double.parse(confidenceString.replaceAll('}', '').trim());
        //double d = double.parse(confidenceString.replaceAll('}', '').trim());
        //String inString = d.toStringAsFixed(1); // '2.35'
        //_confidence = double.parse(inString); // 2.35
        // _confidence = double.parse(inString);
        _confidence = d;

        print(_predictionResult);
        print(_confidence);
      });
      //_navigatetoreport();
    } else {
      // Handle the error
      print('Error: ${response.statusCode}');
    }
  }

  _navigatetotest() async {
    await Future.delayed(const Duration(milliseconds: 3000), () {});
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => PlantDiseasePredictor()),
    );
  }

  _navigatetohome() async {
    await Future.delayed(const Duration(milliseconds: 3000), () {});
    Navigator.pushReplacement(
        context, MaterialPageRoute(builder: (context) => LaunchScreen()));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Stack(
        children: [
//existing content
          Container(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Container(
                  // autogroup8nduqN7 (H3xCeFg84XTUdV2P6F8ndu)
                  margin: const EdgeInsets.fromLTRB(0, 0, 0, 40),
                  width: double.infinity,
                  height: 412,
                  child: Stack(
                    children: [
                      Positioned(
                        // statusbarsandroidLpf (206:692)
                        left: 0,
                        top: 0,
                        child: Container(
                          padding: const EdgeInsets.fromLTRB(16, 8, 16, 223),
                          width: 412,
                          height: 315,
                          decoration: const BoxDecoration(
                            color: Color.fromARGB(255, 73, 185, 148),
                            borderRadius: BorderRadius.only(
                              bottomRight: Radius.circular(24),
                              bottomLeft: Radius.circular(24),
                            ),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: const [
                              SizedBox(
                                height: 45,
                              ),
                              Text(
                                'CropsAI',
                                style: TextStyle(
                                  fontFamily: 'Roboto',
                                  fontSize: 26,
                                  fontWeight: FontWeight.w700,
                                  height: 1.3103448276,
                                  color: Color(0xffffffff),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Positioned(
                        // card4Go (206:794)
                        left: 16,
                        top: 116,
                        right: 16,
                        child: Container(
                          padding: const EdgeInsets.fromLTRB(16, 16, 16, 16),
                          width: 343,
                          height: 300,
                          decoration: BoxDecoration(
                            color: const Color(0xffffffff),
                            borderRadius: BorderRadius.circular(10),
                            boxShadow: const [
                              BoxShadow(
                                color: Colors.grey,
                                offset: Offset(0, 4),
                                blurRadius: 22,
                              ),
                            ],
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Container(
                                // cardbodyWuV (206:795)
                                margin: const EdgeInsets.fromLTRB(0, 0, 0, 16),
                                width: double.infinity,
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Container(
                                      // rectangle34G7y (206:796)
                                      margin: const EdgeInsets.fromLTRB(
                                          0, 0, 0, 16),
                                      width: 311,
                                      height: 114,
                                      child: ClipRRect(
                                        borderRadius: BorderRadius.circular(11),
                                        child: Image.asset(
                                          'assets/images/howitworks.png',
                                          fit: BoxFit.cover,
                                        ),
                                      ),
                                    ),
                                    Container(
                                      // mediaMv7 (206:797)
                                      width: double.infinity,
                                      height: 79,
                                      child: Container(
                                        // mediabodyXZh (I206:797;17:1122)
                                        width: double.infinity,
                                        height: double.infinity,
                                        child: Stack(
                                          children: [
                                            Positioned(
                                              // mediacontentYDu (I206:797;17:1124)
                                              left: 0,
                                              top: 0,
                                              child: Container(
                                                width: 305,
                                                height: 79,
                                                child: Column(
                                                  crossAxisAlignment:
                                                      CrossAxisAlignment.start,
                                                  children: [
                                                    Container(
                                                      // frankestebanT5y (I206:797;17:1124;15:637)
                                                      margin: const EdgeInsets
                                                              .fromLTRB(
                                                          0, 0, 0, 10),
                                                      child: const Text(
                                                        'Try CropsAI Now',
                                                        style: TextStyle(
                                                          fontFamily: 'Roboto',
                                                          fontSize: 20,
                                                          fontWeight:
                                                              FontWeight.w500,
                                                          height: 1.15,
                                                          color:
                                                              Color(0xff000000),
                                                        ),
                                                      ),
                                                    ),
                                                    Container(
                                                      // webdevelopmentkas (I206:797;17:1124;15:638)
                                                      constraints:
                                                          const BoxConstraints(
                                                        maxWidth: 305,
                                                      ),
                                                      child: const Text(
                                                        'Use your camera to upload a photo of plant leaf or upload from gallery',
                                                        style: TextStyle(
                                                          fontFamily: 'Roboto',
                                                          fontSize: 16,
                                                          fontWeight:
                                                              FontWeight.w400,
                                                          height: 1.2375,
                                                          color:
                                                              Color(0xad000000),
                                                        ),
                                                      ),
                                                    ),
                                                  ],
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Container(
                                // cardfooterGZD (206:798)
                                margin: const EdgeInsets.fromLTRB(0, 0, 113, 0),
                                width: double.infinity,
                                height: 39,
                                child: Row(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Container(
                                      // buttonQfR (206:799)
                                      margin: const EdgeInsets.fromLTRB(
                                          0, 0, 13, 0),
                                      child: TextButton(
                                        onPressed: () {
                                          Navigator.push(
                                              context,
                                              MaterialPageRoute(
                                                  builder: (context) =>
                                                      PlantDiseasePredictor()));
                                          // const SignInScreen(); //nee5d to update with progress screen
                                        },
                                        style: TextButton.styleFrom(
                                          padding: EdgeInsets.zero,
                                        ),
                                        child: Container(
                                          width: 91,
                                          height: double.infinity,
                                          decoration: BoxDecoration(
                                            color: const Color(0xff6bb83b),
                                            borderRadius:
                                                BorderRadius.circular(4),
                                          ),
                                          child: const Center(
                                            child: Text(
                                              'CAMERA',
                                              textAlign: TextAlign.center,
                                              style: TextStyle(
                                                fontFamily: 'Roboto',
                                                fontSize: 13,
                                                fontWeight: FontWeight.w700,
                                                height: 1.1725,
                                                letterSpacing: 1.0800000429,
                                                color: Color(0xffffffff),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                    TextButton(
                                      // buttonUQP (206:800)
                                      onPressed: () {
                                        _getImageAndPredict();
                                      },
                                      // onPressed: () {
                                      //   Navigator.push(
                                      //       context,
                                      //       MaterialPageRoute(
                                      //           builder: (context) =>
                                      //               ResultScreen(
                                      //                 confidence: null,
                                      //                 predictionResult: '',
                                      //               )));
                                      // },
                                      style: TextButton.styleFrom(
                                        padding: EdgeInsets.zero,
                                      ),
                                      child: Container(
                                        width: 94,
                                        height: double.infinity,
                                        decoration: BoxDecoration(
                                          color: const Color(0xff6bb83b),
                                          borderRadius:
                                              BorderRadius.circular(4),
                                        ),
                                        child: const Center(
                                          child: Text(
                                            'GALLERY',
                                            textAlign: TextAlign.center,
                                            style: TextStyle(
                                              fontFamily: 'Roboto',
                                              fontSize: 13,
                                              fontWeight: FontWeight.w700,
                                              height: 1.1725,
                                              letterSpacing: 1.0800000429,
                                              color: Color(0xffffffff),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  // cardXNf (206:809)
                  margin: const EdgeInsets.fromLTRB(16, 0, 16, 142),
                  padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
                  width: double.infinity,
                  height: 158,
                  decoration: BoxDecoration(
                    color: const Color(0xffffffff),
                    borderRadius: BorderRadius.circular(10),
                    boxShadow: const [
                      BoxShadow(
                        color: Colors.grey,
                        offset: Offset(0, 4),
                        blurRadius: 22,
                      ),
                    ],
                  ),
                  child: SizedBox(
                    // cardheadero5H (206:810)
                    width: double.infinity,
                    height: double.infinity,
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          // frame99ixw (206:811)
                          margin: const EdgeInsets.fromLTRB(0, 0, 15, 0),
                          width: 44,
                          height: 44,
                          child: Image.asset(
                            'assets/images/joinus.png',
                            width: 44,
                            height: 44,
                          ),
                        ),
                        Container(
                          // frame984G7 (206:813)
                          width: 252,
                          height: double.infinity,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Container(
                                // mediaDeo (206:814)
                                margin: const EdgeInsets.fromLTRB(0, 0, 0, 15),
                                width: double.infinity,
                                height: 72,
                                child: Container(
                                  // mediabodyyP5 (206:815)
                                  width: double.infinity,
                                  height: double.infinity,
                                  child: Container(
                                    // mediacontentwqh (206:816)
                                    width: 215,
                                    height: double.infinity,
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Container(
                                          // frankestebanHef (I206:816;15:637)
                                          margin: const EdgeInsets.fromLTRB(
                                              0, 0, 0, 3),
                                          child: const Text(
                                            'Farming Community',
                                            style: TextStyle(
                                              fontFamily: 'Roboto',
                                              fontSize: 20,
                                              fontWeight: FontWeight.w500,
                                              height: 1.15,
                                              color: Color(0xff000000),
                                            ),
                                          ),
                                        ),
                                        Container(
                                          // webdevelopmentcB9 (I206:816;15:638)
                                          constraints: const BoxConstraints(
                                            maxWidth: 215,
                                          ),
                                          child: const Text(
                                            'Join With Us to Share Your Knowledge',
                                            style: TextStyle(
                                              fontFamily: 'Roboto',
                                              fontSize: 16,
                                              fontWeight: FontWeight.w400,
                                              height: 1.2375,
                                              color: Color(0xad000000),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ),
                              TextButton(
                                // buttonLsq (206:817)
                                onPressed: () {
                                  Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                          builder: (context) =>
                                              const SignInScreen()));
                                  // const SignInScreen(); //nee5d to update with progress screen
                                },
                                style: TextButton.styleFrom(
                                  padding: EdgeInsets.zero,
                                ),
                                child: Container(
                                  width: 116,
                                  height: 39,
                                  decoration: BoxDecoration(
                                    color: const Color(0xff6bb83b),
                                    borderRadius: BorderRadius.circular(4),
                                  ),
                                  child: const Center(
                                    child: Text(
                                      'SIGN IN',
                                      textAlign: TextAlign.center,
                                      style: TextStyle(
                                        fontFamily: 'Roboto',
                                        fontSize: 13,
                                        fontWeight: FontWeight.w700,
                                        height: 1.1725,
                                        letterSpacing: 1.0800000429,
                                        color: Color(0xffffffff),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
          // Navigation panel
          Positioned(
            top: 690,
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              margin: const EdgeInsets.fromLTRB(0, 90, 0, 0),
              width: 150,
              height: 100,
              color: const Color.fromARGB(255, 73, 185, 148),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const SizedBox(
                    width: 70,
                  ),
                  IconButton(
                    icon: Image.asset(
                      'assets/images/home.png',
                      color: Colors.white,
                    ),
                    iconSize: 50,
                    onPressed: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const LaunchScreen()));
                      // const SignInScreen(); //nee5d to update with progress screen
                    },
                  ),
                  const SizedBox(
                    width: 70,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
