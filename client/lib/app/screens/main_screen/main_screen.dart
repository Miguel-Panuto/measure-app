import 'package:client/app/providers/pc_provider.dart';
import 'package:client/utils/app_routes.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class MainScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final ipController = TextEditingController();
    final portController = TextEditingController();
    void _setIp() async {
      bool isConnected = await Provider.of<PcProvider>(context, listen: false)
          .setIp(ipController.text, portController.text);
      if (isConnected) {
        Navigator.of(context).pushReplacementNamed(AppRoutes.HOME);
      } else
        return showDialog(
          context: context,
          builder: (ctx) => AlertDialog(
            title: Text('Erro'),
            content: Text(
              'Aconteceu um erro ao tentar se conectar, verifique se o IP está correto!',
            ),
            actions: <Widget>[
              FlatButton(
                onPressed: () => Navigator.of(context).pop(),
                child: Text('Ok'),
              ),
            ],
          ),
        );
    }

    return Scaffold(
      body: Center(
        child: Container(
          width: double.infinity,
          height: 400,
          padding: const EdgeInsets.all(30),
          child: Card(
            elevation: 10,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 35, vertical: 20),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: <Widget>[
                  TextField(
                    controller: ipController,
                    decoration: InputDecoration(labelText: 'Entre com o IP'),
                  ),
                  TextField(
                    controller: portController,
                    decoration: InputDecoration(labelText: 'Entre com a porta'),
                  ),
                  RaisedButton(
                    child: Text('Conectar'),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    onPressed: _setIp,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
