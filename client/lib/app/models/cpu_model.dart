class Cpu {
  final String manufacturer;
  final String brand;
  final double speed;
  final String socket;
  final int cores;
  final int physicalCores;

  const Cpu(
    this.manufacturer,
    this.brand,
    this.speed,
    this.socket,
    this.cores,
    this.physicalCores,
  );
}
