import 'package:crops_ai/screens/signin_screen.dart';
import 'package:crops_ai/screens/signup_screen.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import 'launch_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        extendBodyBehindAppBar: false,
        appBar: AppBar(
          title: const Text(
            'Plant Diseases and Remedies',
            maxLines: 2,
          ),
          backgroundColor: const Color.fromARGB(255, 73, 185, 148),
          actions: <Widget>[
            IconButton(
              icon: const Icon(Icons.logout),
              tooltip: 'Logout',
              onPressed: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const LaunchScreen()));
                // const SignInScreen(); //nee5d to update with progress screen
              },
            ),
          ],
        ),
        body: SingleChildScrollView(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
              Container(
                margin: const EdgeInsets.all(10),
                child: Table(
                  columnWidths: const {
                    0: FlexColumnWidth(2),
                    1: FlexColumnWidth(4),
                  },
                  border: const TableBorder(
                    bottom: BorderSide(
                        color: Color.fromARGB(255, 73, 185, 148), width: 2),
                    horizontalInside: BorderSide(
                        color: Color.fromARGB(255, 73, 185, 148), width: 2),
                  ),
                  children: const [
                    TableRow(children: [
                      Text('Plant Disease',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Color.fromARGB(255, 73, 185, 148),
                            fontSize: 20,
                          )),
                      Text('Remedy',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Color.fromARGB(255, 73, 185, 148),
                              fontSize: 20)),
                    ]),
                    TableRow(children: [
                      Text('Plant Disease 1',
                          textAlign: TextAlign.justify,
                          style: TextStyle(
                              fontWeight: FontWeight.bold, fontSize: 15)),
                      Text(
                          'Soak dormant cuttings for 30 mins in hot water at about 50°C. This treatment is not always effective and must therefore be combined with other methods. Some species of Trichoderma have been used to prevent the infection of pruning wounds, basal ends of propagation material, and graft unions. This treatment has to be carried out within 24 hours of pruning and again 2 weeks after. ',
                          textAlign: TextAlign.justify,
                          style: TextStyle(fontSize: 15)),
                    ]),
                  ],
                ),
              ),
            ]))
        //        //Navigation panel
        // bottomNavigationBar: Container(
        //   color: const Color.fromARGB(255, 73, 185,
        //       148), // customize the color of the panel as per your design
        //   height: 60,
        //   child: Row(
        //     mainAxisAlignment: MainAxisAlignment.center,
        //     children: [
        //       const SizedBox(
        //         width: 70,
        //       ),
        //       IconButton(
        //         icon: Image.asset(
        //           'assets/images/home.png',
        //           color: Colors.white,
        //         ),
        //         iconSize: 50,
        //         onPressed: () {
        //           Navigator.push(
        //               context,
        //               MaterialPageRoute(
        //                   builder: (context) => const LaunchScreen()));
        //           // const SignInScreen(); //nee5d to update with progress screen
        //         },
        //       ),
        //       const SizedBox(
        //         width: 70,
        //             ),
        //     ],
        //   ),
        // ),
        );
  }
}
