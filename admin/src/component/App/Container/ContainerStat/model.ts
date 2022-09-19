export interface ContainerStatInfo {
    id: string
    name: string
    read: string
    perread: string
    cpu_stats: CpuStats
    memory_stats: MemoryStats
}


export interface MemoryStats {
    // 已使用内存
    usage: number
    // 可用内存
    limit: number
}


export interface CpuStats {
    cpu_usage: CpuStats
    // 系统CPU使用
    system_cpu_usage: number
    // 可用核心数
    online_cpus: number
}

export interface CpuUsage {
    total_usage: number
}
