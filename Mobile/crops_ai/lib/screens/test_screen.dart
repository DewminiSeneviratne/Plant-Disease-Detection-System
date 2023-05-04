import 'dart:io';
import 'package:crops_ai/screens/result_page.dart';
import 'package:crops_ai/screens/signin_screen.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
//import 'package:image_picker/image_picker.dart';
import 'package:path/path.dart' as path;

import 'package:http/http.dart' as http;

import 'dart:io';
import 'package:image_picker/image_picker.dart';

import 'launch_screen.dart';

class PlantDiseasePredictor extends StatefulWidget {
  //final String email_user;

  //PlantDiseasePredictor({required this.email_user});

  @override
  _PlantDiseasePredictorState createState() => _PlantDiseasePredictorState();
}

class _PlantDiseasePredictorState extends State<PlantDiseasePredictor> {
  File? _image;
  String? _predictionResult; // Added new variable to store prediction result
  double? _confidence;

  Future<void> _getImageAndPredict() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.camera);

    if (pickedFile != null) {
      final imageFile = File(pickedFile.path);
      await predictPlantDisease(imageFile);
      setState(() {
        _image = imageFile;
      });
    } else {
      print('No image selected.');
    }
  }

  Future<void> predictPlantDisease(File imageFile) async {
    final url = 'http://192.168.8.162:8000/predict';

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
      // Parse the response and handle the result
      final result = response.body.split(",");
      final predictionResult = result[0].replaceAll(RegExp(r'[\[\]" ]'), '');
      print(result);
      setState(() {
        _predictionResult = predictionResult;
        _confidence = double.parse(result[1].replaceAll(']', '').trim());
        print(_predictionResult);
        print(_confidence);
      });
      _navigateToReport();
    } else {
      // Handle the error
      print('Error: ${response.statusCode}');
    }
  }

  void _navigateToReport() {
    Navigator.push(
      context,
      MaterialPageRoute(
        //builder: (context) => Result(predictionResult: _predictionResult),
        builder: (context) => Result(
          predictionResult: _predictionResult,
          confidence: _confidence,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFFFFFF),
      body: Container(
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: double.infinity,
                  height: 750,
                  decoration: BoxDecoration(
                    color: Color(0xFFFFFFFF),
                  ),
                  child: Stack(
                    children: [
                      Positioned(
                        left: 10,
                        top: 60,
                        right: 10,
                        child: Container(
                          margin: EdgeInsets.fromLTRB(5, 5, 5, 18),
                          padding: EdgeInsets.fromLTRB(16, 16, 16, 218),
                          width: 375,
                          height: 730,
                          decoration: BoxDecoration(
                            color: Color(0xFFFFFFFF),
                          ),
                          child: Container(
                            // dialogscustomUMZ (8:4695)
                            padding: EdgeInsets.fromLTRB(16, 40, 16, 16),
                            width: double.infinity,
                            height: double.infinity,
                            decoration: BoxDecoration(
                              color: Color(0xFFFFFFFF),
                              borderRadius: BorderRadius.circular(10),
                              boxShadow: const [
                                BoxShadow(
                                  color: Colors.blueGrey,
                                  offset: Offset(0, 6),
                                  blurRadius: 16,
                                ),
                              ],
                            ),
                            child: Container(
                              // contentkK5 (8:4696)
                              width: double.infinity,
                              height: double.infinity,
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Container(
                                    margin:
                                        const EdgeInsets.fromLTRB(0, 0, 0, 32),
                                    width: double.infinity,
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.center,
                                      children: [
                                        Container(
                                          width: double.infinity,
                                          child: Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.center,
                                            children: [
                                              Container(
                                                padding: EdgeInsets.fromLTRB(
                                                    0, 0, 0, 0),
                                                margin: EdgeInsets.fromLTRB(
                                                    0, 0, 60, 8),
                                                child: const Text(
                                                  'Please follow the instructions',
                                                  style: TextStyle(
                                                    fontFamily: 'Roboto-Light',
                                                    fontSize: 19,
                                                    fontWeight: FontWeight.w700,
                                                    height: 1.4117647059,
                                                    letterSpacing:
                                                        -0.1000000015,
                                                    color: const Color.fromARGB(
                                                        255, 73, 185, 148),
                                                  ),
                                                ),
                                              ),
                                              Container(
                                                padding:
                                                    const EdgeInsets.fromLTRB(
                                                        2, 0, 0, 0),
                                                margin: EdgeInsets.fromLTRB(
                                                    0, 0, 10, 8),
                                                child: const Text(
                                                  '1. Hold the phone close to the plant leaf '
                                                  '2. Hold the phone still',
                                                  textAlign: TextAlign.left,
                                                  style: TextStyle(
                                                    fontFamily: 'Roboto-Thin',
                                                    fontSize: 19,
                                                    fontWeight: FontWeight.w700,
                                                    height: 1.4117647059,
                                                    letterSpacing:
                                                        -0.1000000015,
                                                    color: Colors.black,
                                                  ),
                                                ),
                                              ),
                                              const SizedBox(
                                                height: 20,
                                              ),
                                              Container(
                                                margin:
                                                    const EdgeInsets.fromLTRB(
                                                        2, 5, 2, 2),
                                                padding:
                                                    const EdgeInsets.fromLTRB(
                                                        0, 0, 0, 0),
                                                width: double.infinity,
                                                height: 200,
                                                decoration: BoxDecoration(
                                                  color: Color.fromARGB(
                                                      255, 244, 254, 241),
                                                  //borderRadius:
                                                  //BorderRadius.circular(16),
                                                  border: Border.all(
                                                    color: Colors.grey,
                                                    width: 2,
                                                  ),
                                                ),
                                                child: Center(
                                                    // errorTMu (11:1073)
                                                    child: Image.asset(
                                                  'assets/images/example.jpg',
                                                  height: 400,
                                                  width: 400,
                                                )),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  const SizedBox(
                                    height: 20,
                                  ),
                                  Container(
                                    // buttonGTm (8:4702)
                                    width: double.infinity,
                                    child: const Center(
                                        child: Text(
                                      'Refer the above example picture',
                                      style: TextStyle(
                                        fontFamily: 'Roboto-Medium',
                                        fontSize: 16,
                                        fontWeight: FontWeight.w500,
                                        height: 1.4117647059,
                                        letterSpacing: -0.1000000015,
                                        color: Colors.grey,
                                      ),
                                    )),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          //heree
                        ),
                      ),
                      Center(
                        child: Container(
                          // buttonsprimarypurple1RM (8:4703)
                          margin: const EdgeInsets.fromLTRB(50, 500, 50, 0),
                          child: ElevatedButton(
                            onPressed: _getImageAndPredict,
                            style: TextButton.styleFrom(
                              padding: EdgeInsets.zero,
                            ),
                            child: Container(
                              width: 200,
                              height: 56,
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(6),
                                color: const Color(0xff6bb83b),
                              ),
                              child: const Center(
                                child: Text(
                                  'TAKE IMAGE',
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                    fontFamily: 'Roboto',
                                    fontSize: 15,
                                    fontWeight: FontWeight.w700,
                                    height: 1.1725,
                                    letterSpacing: 1.0800000429,
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                      Center(
                        child: Container(
                          // buttonsprimarypurple1RM (8:4703)
                          margin: EdgeInsets.fromLTRB(50, 650, 50, 0),
                          child: ElevatedButton(
                            onPressed: _navigateToReport,
                            style: TextButton.styleFrom(
                              padding: EdgeInsets.zero,
                            ),
                            child: Container(
                              width: 200,
                              height: 56,
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(6),
                                color: const Color(0xff6bb83b),
                              ),
                              child: const Center(
                                child: Text(
                                  'GO TO RESULT',
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                    fontFamily: 'Roboto',
                                    fontSize: 15,
                                    fontWeight: FontWeight.w700,
                                    height: 1.1725,
                                    letterSpacing: 1.0800000429,
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                // ),
              ],
            ),
          ),
        ),
      ),

      //Navigation panel
      bottomNavigationBar: Container(
        color: const Color.fromARGB(255, 73, 185,
            148), // customize the color of the panel as per your design
        height: 60,
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
                const SignInScreen(); //nee5d to update with progress screen
              },
            ),
            const SizedBox(
              width: 70,
            ),
          ],
        ),
      ),
    );
  }

  double _getFontSize(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    return size.width * 0.05;
  }
}
