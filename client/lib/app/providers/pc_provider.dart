import 'dart:convert';
import 'dart:math';

import 'package:client/app/models/cpu_model.dart';
import 'package:client/app/models/ram_model.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class PcProvider with ChangeNotifier {
  String _ip;

  List<Ram> _rams = [];
  List<Ram> get rams => [..._rams];
  int get ramsCount => _rams.length;

  Cpu _cpu;
  Cpu get cpu => _cpu;

  Future<bool> setIp(String ip, String port) async {
    try {
      final response = await http.get('http://$ip:$port/');
      if (response.body == 'ok') {
        _ip = 'http://$ip:$port';
        await setPc();
        return true;
      }
      return false;
    } catch (e) {
      print(e);
      return false;
    }
  }

  Future<void> setPc() async {
    final cpuJson = await http.get('$_ip/cpu-specs');
    final ramJson = await http.get('$_ip/ram-specs');

    final cpuDecoded = json.decode(cpuJson.body);
    final ramDecoded = json.decode(ramJson.body);
    _cpu = Cpu(
      cpuDecoded['manufacturer'],
      cpuDecoded['brand'],
      double.parse(cpuDecoded['speed']),
      cpuDecoded['socket'],
      cpuDecoded['cores'],
      cpuDecoded['physicalCores'],
    );
    _rams = ramDecoded.map<Ram>(
      (ram) {
        final actualRam = Ram(Random().nextDouble().toString(), ram['clock'], ram['size']);
        return actualRam;
      } 
    ).toList();
  }

  Future<double> getRamUsage() async {
    try {
      final response = await http.get('$_ip/ram');
      final usage = json.decode(response.body)['usage'];
      return double.parse(usage);
    } catch (e) {
      return 0;
    }
  }

  // ignore: missing_return
  Future<double> getCpuUsage() async {
    try {
      final response = await http.get('$_ip/cpu');
      final usages = json.decode(response.body);
      double _cpuUsages = 0;
      usages.forEach((cpu) {
        _cpuUsages += double.parse(cpu['usage']);
      });
      return _cpuUsages / usages.length;
    } catch (e) {
      return 0;
    }
  }
}
