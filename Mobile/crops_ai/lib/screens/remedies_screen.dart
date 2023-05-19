import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

import 'launch_screen.dart';

class RemediesScreen extends StatefulWidget {
  final String diseaseName;

  RemediesScreen({required this.diseaseName});

  @override
  _RemediesScreenState createState() => _RemediesScreenState();
}

class _RemediesScreenState extends State<RemediesScreen> {
  QuerySnapshot? filteredUsersSnapshot;

  // Method to filter documents
  void filterDocuments() async {
    // Get a reference to the collection you want to filter
    CollectionReference usersRef =
        FirebaseFirestore.instance.collection('Remedies');

    print(widget.diseaseName);

    // Build a query to filter documents
    Query filteredUsersQuery =
        usersRef.where('DiseaseName', isEqualTo: widget.diseaseName);
    // usersRef.where('DiseaseName', isEqualTo: 'Bacterial Spot of Tomato');

    // Retrieve the documents that match the filter
    filteredUsersSnapshot = await filteredUsersQuery.get();

    // Update the UI with the filtered documents
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Remedies'),
        backgroundColor: const Color.fromARGB(255, 73, 185, 148),
      ),
      body: Column(
        children: [
          ElevatedButton(
            onPressed: filterDocuments,
            child: Text('Filter Remedies'),
          ),
          Expanded(
            child: filteredUsersSnapshot != null
                ? ListView.builder(
                    itemCount: filteredUsersSnapshot!.docs.length,
                    itemBuilder: (context, index) {
                      DocumentSnapshot documentSnapshot =
                          filteredUsersSnapshot!.docs[index];
                      Map<String, dynamic> data =
                          documentSnapshot.data() as Map<String, dynamic>;

                      return ListTile(
                        title: Text(
                          data['DiseaseName'],
                          style: const TextStyle(
                            fontFamily: 'Roboto-Light',
                            fontSize: 20,
                            fontWeight: FontWeight.w700,
                            height: 1.4117647059,
                            letterSpacing: -0.1000000015,
                            color: Colors.black,
                          ),
                        ),
                        subtitle: Text(
                          'Remedy: ${data['Remedy']}',
                          style: const TextStyle(
                            fontFamily: 'Roboto-Light',
                            fontSize: 19,
                            fontWeight: FontWeight.w400,
                            height: 1.4117647059,
                            letterSpacing: -0.1000000015,
                            color: Colors.black,
                          ),
                        ),
                      );
                    },
                  )
                : Container(),
          ),
        ],
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
