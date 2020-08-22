package merliontechs.service;

import merliontechs.domain.Product;
import merliontechs.domain.Sales;
import merliontechs.domain.enumeration.State;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.*;
import java.util.stream.Collectors;
import java.math.BigDecimal;


@Service
@Transactional
public class StatisticsService {

    private final Logger log = LoggerFactory.getLogger(StatisticsService.class);

    @Autowired
    private EntityManager em;

    public StatisticsService() {
    }

    private Map<Object, Long> makeReturnWithLong(CriteriaQuery<Tuple> criteria, int limit) {
      return em.createQuery(criteria)
        .setFirstResult(0)
        .setMaxResults(limit)
        .getResultList().stream()
        .collect(Collectors.toMap(tuple -> tuple.get(0), tuple -> tuple.get(1, Long.class)));
    }

    private Map<Object, BigDecimal> makeReturnWithBig(CriteriaQuery<Tuple> criteria, int limit) {
      return em.createQuery(criteria)
        .setFirstResult(0)
        .setMaxResults(limit)
        .getResultList().stream()
        .collect(Collectors.toMap(tuple -> tuple.get(0), tuple -> tuple.get(1, BigDecimal.class)));
    }

    public Map<Object, Long> ventasPorDia() {
        log.debug("Calculando ventas por dia.");
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Tuple> criteria = cb.createTupleQuery();
        Root<Sales> root = criteria.from(Sales.class);
        criteria.multiselect(root.get("date"), cb.count(cb.literal(1)));
        criteria.groupBy(root.get("date"));
        criteria.orderBy(cb.desc(root.get("date")));
        return makeReturnWithLong(criteria, 6);
    }

    public Map<Object, Long> ventasPorDiaDelivered() {
        log.debug("Calculando ventas por dia en estado Delivered.");
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Tuple> criteria = cb.createTupleQuery();
        Root<Sales> root = criteria.from(Sales.class);
        criteria.multiselect(root.get("date"), cb.count(cb.literal(1)));
        criteria.where(cb.equal(root.get("state"), State.DELIVERED));
        criteria.groupBy(root.get("date"));
        criteria.orderBy(cb.desc(root.get("date")));
        return makeReturnWithLong(criteria, 6);
    }

    public Map<Object, Long> top5Vendidos() {
        log.debug("Calculando Top 5 Vendidos.");
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Tuple> criteria = cb.createTupleQuery();
        Root<Sales> root = criteria.from(Sales.class);
        Join<Sales, Product> p = root.join("product", JoinType.LEFT);
        criteria.multiselect(p.get("name"), cb.count(cb.literal(1)));
        criteria.groupBy(p.get("name"));
        criteria.orderBy(cb.desc(cb.count(cb.literal(1))));
        return makeReturnWithLong(criteria, 5);
    }

    public Map<Object, BigDecimal> top5Ingresos() {
        log.debug("Calculando Top 5 en Ingresos.");
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Tuple> criteria = cb.createTupleQuery();
        Root<Sales> root = criteria.from(Sales.class);
        Join<Sales, Product> p = root.join("product", JoinType.LEFT);
        criteria.multiselect(p.get("name"), cb.sum(p.get("price")));
        criteria.groupBy(p.get("name"));
        criteria.orderBy(cb.desc(cb.sum(p.get("price"))));
        return makeReturnWithBig(criteria, 5);
    }
}
