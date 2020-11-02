import 'package:client/app/screens/home_screen/widgets/cpu_card_widget.dart';
import 'package:client/app/screens/home_screen/widgets/ram_card_widget.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              CpuCardWidget(),
              RamCardWidget(),
            ],
          ),
        ),
      ),
    );
  }
}
