import 'package:flutter/material.dart';

class TitlePieceWidget extends StatelessWidget {
  final String title;

  const TitlePieceWidget({
    @required this.title
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 10),
      padding: const EdgeInsets.all(10),
      child: Text(
        title,
        style: TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 18,
          color: Theme.of(context).accentColor,
        ),
      ),
    );
  }
}