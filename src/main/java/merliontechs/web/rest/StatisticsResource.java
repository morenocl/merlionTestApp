package merliontechs.web.rest;

import merliontechs.service.StatisticsService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.*;

import java.util.Map;
import java.util.stream.Collectors;
import java.math.BigDecimal;


@RestController
@RequestMapping("/api")
@Transactional
public class StatisticsResource {

    private final Logger log = LoggerFactory.getLogger(StatisticsResource.class);

    private final StatisticsService statisticsService;

    public StatisticsResource(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @GetMapping("/statistics/g1")
    public Map<Object, Long> ventasPorDia() {
        log.debug("REST request to get statistics of Sales: Graphics g1");
        return statisticsService.ventasPorDia();
    }

    @GetMapping("/statistics/g2")
    public Map<Object, Long> ventasPorDiaDelivered() {
        log.debug("REST request to get statistics of Sales: Graphics g2");
        return statisticsService.ventasPorDiaDelivered();
    }

    @GetMapping("/statistics/g3")
    public Map<Object, Long> top5Vendidos() {
        log.debug("REST request to get statistics of Sales: Graphics g3");
        return statisticsService.top5Vendidos();
    }

    @GetMapping("/statistics/g4")
    public Map<Object, BigDecimal> top5Ingresos() {
        log.debug("REST request to get statistics of Sales: Graphics g4");
        return statisticsService.top5Ingresos();
    }
}
