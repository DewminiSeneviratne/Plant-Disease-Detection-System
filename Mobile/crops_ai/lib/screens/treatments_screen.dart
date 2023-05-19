import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'launch_screen.dart';

class TreatmentsScreen extends StatefulWidget {
  final String diseaseName;

  TreatmentsScreen({required this.diseaseName});

  get email_user => null;

  @override
  _TreatmentsScreenState createState() => _TreatmentsScreenState();
}

class _TreatmentsScreenState extends State<TreatmentsScreen> {
  List<String> _treatments = [];

  @override
  void initState() {
    super.initState();
    _fetchTreatments();
  }

  _fetchTreatments() async {
    final response = await http.post(
        Uri.parse("http://10.10.122.43/cropsai/treatments_fetch.php"),
        body: {
          "disease": widget.diseaseName,
        });

    if (response.statusCode == 200) {
      List<dynamic> treatmentsJson = jsonDecode(response.body);
      List<String> treatments =
          treatmentsJson.map((treatment) => treatment.toString()).toList();

      setState(() {
        _treatments = treatments;
      });
    } else {
      throw Exception('Failed to fetch treatments');
    }
  }

  _navigatetohome() async {
    await Future.delayed(const Duration(milliseconds: 3000), () {});
    Navigator.pushReplacement(
        context, MaterialPageRoute(builder: (context) => LaunchScreen()));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Remedies'),
        backgroundColor: const Color.fromARGB(255, 73, 185, 148),
      ),
      body: _treatments.isNotEmpty
          ? ListView.builder(
              itemCount: _treatments.length,
              itemBuilder: (BuildContext context, int index) {
                return ListTile(
                  title: Text(_treatments[index]),
                );
              })
          : const Center(
              child: CircularProgressIndicator(),
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
}
