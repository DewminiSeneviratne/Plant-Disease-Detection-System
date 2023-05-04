import 'package:crops_ai/screens/treatments_screen.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'launch_screen.dart';

// import 'basic_treatments.dart';

class Result extends StatefulWidget {
  final String? predictionResult;
  final double? confidence;
  //const Result({super.key});
  Result({
    required this.predictionResult,
    required this.confidence,
  });

  @override
  State<Result> createState() => _ResultState();
}

class _ResultState extends State<Result> {
  @override
  void initState() {
    super.initState();
    _updatePercentage();
  }

  Future<void> _updatePercentage() async {
    final url = 'http://192.168.8.162/visio/updatePercentage.php';
    final response = await http.post(
      Uri.parse(url),
      body: {
        'confidence': widget.confidence.toString(),
      },
    );

    if (response.statusCode == 200) {
      print('Percentage updated successfully');
    } else {
      print('Failed to update percentage: ${response.reasonPhrase}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: double.infinity,
                  height: 750,
                  decoration: BoxDecoration(),
                  child: Stack(
                    children: [
                      Container(
                        padding: const EdgeInsets.fromLTRB(170, 25, 16, 220),
                        child: const Text(
                          'Result',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontFamily: 'Roboto',
                            fontSize: 20,
                            fontWeight: FontWeight.w500,
                            height: 1.4117647059,
                            letterSpacing: -0.1000000015,
                            color: Colors.black,
                          ),
                        ),
                      ),
                      Positioned(
                        left: 10,
                        top: 60,
                        right: 10,
                        child: Container(
                          padding: const EdgeInsets.fromLTRB(16, 16, 16, 218),
                          width: 375,
                          height: 800,
                          decoration: const BoxDecoration(
                            color: Color(0xccFFFFFF),
                          ),
                          child: Container(
                            // dialogscustomUMZ (8:4695)
                            padding: EdgeInsets.fromLTRB(16, 40, 16, 16),
                            width: double.infinity,
                            height: double.infinity,
                            decoration: BoxDecoration(
                              color: Color(0xffffffff),
                              borderRadius: BorderRadius.circular(10),
                              boxShadow: const [
                                BoxShadow(
                                  color: Color(0x26000000),
                                  offset: Offset(0, 11),
                                  blurRadius: 22,
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
                                                padding:
                                                    const EdgeInsets.fromLTRB(
                                                        2, 0, 0, 0),
                                                margin:
                                                    const EdgeInsets.fromLTRB(
                                                        0, 0, 100, 8),
                                                child: const Text(
                                                  'Confidence',
                                                  textAlign: TextAlign.left,
                                                  style: TextStyle(
                                                    fontFamily: 'Roboto-Light',
                                                    fontSize: 19,
                                                    fontWeight: FontWeight.w700,
                                                    height: 1.4117647059,
                                                    letterSpacing:
                                                        -0.1000000015,
                                                    color: Colors.black,
                                                  ),
                                                ),
                                              ),
                                              Container(
                                                padding:
                                                    const EdgeInsets.fromLTRB(
                                                        2, 0, 0, 0),
                                                margin:
                                                    const EdgeInsets.fromLTRB(
                                                        0, 0, 220, 8),
                                                child: Text(
                                                    widget.predictionResult ??
                                                        'No result'),
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
                                                        15.5, 30, 15.5, 20),
                                                width: double.infinity,
                                                height: 300,
                                                decoration: BoxDecoration(
                                                  color: Colors.white,
                                                  borderRadius:
                                                      BorderRadius.circular(16),
                                                  boxShadow: const [
                                                    BoxShadow(
                                                      color: Color(0x26000000),
                                                      offset: Offset(8, 11),
                                                      blurRadius: 22,
                                                    ),
                                                  ],
                                                ),
                                                // child: Center(
                                                //   child:
                                                //       CircularPercentIndicator(
                                                //     radius: 75.0,
                                                //     percent:
                                                //         widget.confidence ??
                                                //             0.0,
                                                //     animation: true,
                                                //     progressColor:
                                                //         Color(0xffde3787),
                                                //     circularStrokeCap:
                                                //         CircularStrokeCap.round,
                                                //     lineWidth: 20.0,
                                                //     center: Text(
                                                //       '${((widget.confidence ?? 0.0) * 100.0).floor()}%',
                                                //       style: const TextStyle(
                                                //           color: Colors.black,
                                                //           fontSize: 24),
                                                //     ),
                                                //   ),
                                                // ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  Container(
                                    // buttonGTm (8:4702)
                                    width: double.infinity,
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.center,
                                      children: [
                                        Container(
                                          // buttonsprimarypurple1RM (8:4703)
                                          margin: const EdgeInsets.fromLTRB(
                                              0, 0, 0, 8),
                                          child: ElevatedButton(
                                            onPressed: () {
                                              if (widget.predictionResult !=
                                                  null) {
                                                // Navigator.push(
                                                //     context,
                                                //     MaterialPageRoute(
                                                //       builder: (context) =>
                                                //           TreatmentsPage(
                                                //               diseaseName: widget
                                                //                   .predictionResult!),
                                                //     ));
                                                Navigator.push(
                                                    context,
                                                    MaterialPageRoute(
                                                        builder: (context) =>
                                                            const TreatmentsScreen(
                                                              diseaseName: '',
                                                            )));
                                              }
                                            },
                                            style: TextButton.styleFrom(
                                              padding: EdgeInsets.zero,
                                            ),
                                            child: Container(
                                              width: double.infinity,
                                              height: 56,
                                              decoration: BoxDecoration(
                                                color: const Color(0xff6bb83b),
                                                borderRadius:
                                                    BorderRadius.circular(4),
                                              ),
                                              child: const Center(
                                                child: Text(
                                                  'Remedies',
                                                  textAlign: TextAlign.center,
                                                  style: TextStyle(
                                                    fontFamily: 'Roboto',
                                                    fontSize: 16,
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
                                        // Container(
                                        //   width: double.infinity,
                                        //   height: 56,
                                        //   child: ElevatedButton(
                                        //     onPressed: () {
                                        //       if (widget.predictionResult !=
                                        //           null) {
                                        //         // Navigator.push(
                                        //         //     context,
                                        //         //     MaterialPageRoute(
                                        //         //       builder: (context) =>
                                        //         //           doctorPage(
                                        //         //               diseaseName: widget
                                        //         //                   .predictionResult!),
                                        //         //     ));
                                        //       }
                                        //     },
                                        //     style: TextButton.styleFrom(
                                        //       padding: EdgeInsets.zero,
                                        //     ),
                                        //     child: Container(
                                        //       width: double.infinity,
                                        //       height: 56,
                                        //       decoration: BoxDecoration(
                                        //         color: const Color.fromARGB(
                                        //             255, 69, 172, 44),
                                        //         borderRadius:
                                        //             BorderRadius.circular(4),
                                        //       ),
                                        //       child: const Center(
                                        //         child: Text(
                                        //           'DOCTOR RECOMMENDATION',
                                        //           textAlign: TextAlign.center,
                                        //           style: TextStyle(
                                        //             fontFamily: 'Roboto',
                                        //             fontSize: 15,
                                        //             fontWeight: FontWeight.w700,
                                        //             height: 1.1725,
                                        //             letterSpacing: 1.0800000429,
                                        //             color: Color(0xffffffff),
                                        //           ),
                                        //         ),
                                        //       ),
                                        //     ),
                                        //   ),
                                        // ),
                                      ],
                                    ),
                                  ),
                                ],
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
                // const SignInScreen(); //nee5d to update with progress screen
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
